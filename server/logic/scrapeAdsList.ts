import {crawler, crawlerRateLimitedQueue} from "./crawler";
import {scrapeAdDetail} from "./scrapeAdDetails";
import {Offer, OfferDetailed} from "./helpers/Offer";
import {LookoutRequest} from "../db/schemas";
import {
    offerMatchLookoutParams,
    offersOverlapsWithDB,
    parseOffer, updateLookoutInitialLookoutFinished,
    updateLookoutOrdersProcessedCount
} from "./scrapeAdsList.utils";
import {CheerioAPI} from "@quackcode-dk/cheerio";

const OFFERS_PARSE_CAP = 900;
const OFFERS_START_PAGE = 1;

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


export default async function scrapeAdsList(lookout: LookoutRequest, previouslyParsed = [], page = OFFERS_START_PAGE): Promise<OfferDetailed[]> {

    return new Promise((resolve, reject) => {

        const pageUrl = `${lookout.url}&page=${page}`;

        crawler.direct({
            uri: pageUrl,
            callback: async function (error, response) {
                if (error)
                    reject(error);
                else {
                    try {

                        const $: CheerioAPI = response.$ as unknown as CheerioAPI;
                        const offers = $(`[data-cy="l-card"]`).toArray()
                            .map(((element) => parseOffer(element as any, $, lookout)));

                        const finalOffers = offers
                            .filter(o => !previouslyParsed.some(prev => prev.url === o.url))
                            .filter(offerMatchLookoutParams(lookout));


                        console.log(`offers collected: ${offers.length} - (uniq) --> ${finalOffers.length}  url: ${lookout.url}`);

                        const detailedOffers = await parseOffersDetails(finalOffers);
                        const allOffersParsed = previouslyParsed.length + detailedOffers.length;
                        console.log(`Parsed +${allOffersParsed} / ${OFFERS_PARSE_CAP} offers...`);

                        const isPageEmpty = !detailedOffers.length;
                        const dataOverlapsWithDB = !isPageEmpty && await offersOverlapsWithDB(detailedOffers);
                        await updateLookoutOrdersProcessedCount(lookout, detailedOffers.length);

                        if (dataOverlapsWithDB || allOffersParsed > OFFERS_PARSE_CAP || isPageEmpty) {
                            resolve(detailedOffers);
                            await updateLookoutInitialLookoutFinished(lookout);

                        } else {

                            const allParsedByNow = [...previouslyParsed, ...detailedOffers];
                            const composedDetailOffers = [
                                ...detailedOffers,
                                ...(await scrapeAdsList(lookout, allParsedByNow, page + 1))];
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
