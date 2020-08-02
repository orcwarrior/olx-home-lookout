import {crawler, crawlerRateLimitedQueue} from "./crawler";
import {reparseDistanceDateStr} from "./helpers/reparseDistanceDateStr";
import {scrapeAdDetail} from "./scrapeAdDetails";
import {Offer, OFFER_TYPE, OfferDetailed} from "./helpers/Offer";
import {deburr, last} from "lodash";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {Offer as OfferDB} from "../db/schemas";
import {URL} from "url";

const MAIN_URI = "https://www.olx.pl/nieruchomosci/mieszkania/lodz/?search%5Bfilter_enum_rooms%5D%5B0%5D=two&search%5Bfilter_enum_rooms%5D%5B1%5D=three&search%5Bfilter_enum_rooms%5D%5B2%5D=four";

async function parseOffersDetails(offers: Array<Offer>): Promise<OfferDetailed[]> {
    return Promise.all(offers.map((offer) => {
        const offerDetailed: Promise<OfferDetailed> = new Promise((resolve, reject) => {
            crawlerRateLimitedQueue({
                uri: offer.url,
                callback: scrapeAdDetail(resolve, offer)
            });
        });
        return offerDetailed;
    }));
    //.catch(err => console.warn("parseOffersDetails.err: ", err));
}

const OFFERS_PARSE_CAP = 20;

const ROOM_RENT_RGX = /pok[óo]je* |room /i;

function parseOffer(el: CheerioElement, $: CheerioAPI): Offer {
    const sub$ = (selector) => $(selector, el);
    const title = sub$("a > strong").text();
    const _priceBase = parseFloat(sub$(".price > strong").text().replace(/zł| /gi, ""));
    const urlNormalized = sub$("td[valign=top] a").attr("href").replace(";promoted", "");
    const [city, district] = sub$("[data-icon=location-filled]").parent().text().split(",");
    return {
        title,
        url: urlNormalized,
        mainImg: sub$("img.fleft").attr("src"),
        _priceBase,
        createdAt: reparseDistanceDateStr(sub$("[data-icon=clock]").parent().text()),
        city: city.trim(),
        district: district && `${city.trim()}, ${district.trim()}`,
        offerType: _getOfferType()
    };

    function _getOfferType(): OFFER_TYPE {
        if (ROOM_RENT_RGX.test(deburr(title)))
            return "ROOM";
        return (title.toLowerCase().includes("wynaj") || _priceBase < 30000)
            ? "RENT" : "PURCHASE";
    }
}

async function offersOverlapsWithDB(offers: Array<Offer>) {
    const queryBuilder = await getQueryBuilder<Offer>();
    const [preLastOffer, lastOffer] = offers.slice(-2);
    const lastOffersInDb = await queryBuilder
        .select()
        .from(OfferDB, "offer")
        .where("offer.url = :url", {url: preLastOffer.url})
        .orWhere("offer.url = :url2", {url2: lastOffer.url})
        .getCount();

    return lastOffersInDb === 2; // DK: check for 2's should be enough even with promoted offers
}

export default async function scrapeAdsList(url: string = MAIN_URI, previouslyParsed = [], page = 1): Promise<OfferDetailed[]> {

    return new Promise((resolve, reject) => {
        crawler.direct({
            uri: url,
            callback: async function (error, response) {
                if (error)
                    reject(error);
                else {
                    try {

                        const $: CheerioAPI = response.$;
                        const offers = $(".offer").toArray()
                            .map(((element) => parseOffer(element, $)));
                        const uniqOffers = offers
                            .filter(o => !previouslyParsed.some(prev => prev.url === o.url));
                        console.log(`offers collected: ${offers.length} - (uniq) --> ${uniqOffers.length}  url: ${url}`);

                        const detailedOffers = await parseOffersDetails(uniqOffers);
                        const allOffersParsed = previouslyParsed.length + detailedOffers.length;
                        console.log(`Parsed +${allOffersParsed} / ${OFFERS_PARSE_CAP} offers...`);

                        const dataOverlapsWithDB = await offersOverlapsWithDB(detailedOffers);

                        if (dataOverlapsWithDB || allOffersParsed > OFFERS_PARSE_CAP)
                            resolve(detailedOffers);
                        else {
                            const nextUrl = (page === 1) ? `${url}&page=${page + 1}`
                                : url.replace(`&page=${page}`, `&page=${page + 1}`);

                            const allParsedByNow = [...previouslyParsed, ...detailedOffers];
                            const composedDetailOffers = [
                                ...detailedOffers,
                                ...(await scrapeAdsList(nextUrl, allParsedByNow, page + 1))];
                            console.log(`Resolve composed: ${composedDetailOffers.length} (page: ${detailedOffers.length}`);
                            resolve(composedDetailOffers);
                        }

                    } catch (e) {
                        console.warn("error: ", e);
                        reject(e);
                    }
                }
            }
        });
    });
}
