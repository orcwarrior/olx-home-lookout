import {Offer, OFFER_TYPE} from "./helpers/Offer";
import {reparseDistanceDateStr} from "./helpers/reparseDistanceDateStr";
import {deburr} from "lodash";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {LookoutRequest, Offer as OfferDB} from "../db/schemas";


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

function offerMatchLookoutParams(lookout: LookoutRequest) {
    return (offer: Offer) => offer.offerType === lookout.lookingFor;
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

async function updateLookoutOrdersProcessedCount(lookout: LookoutRequest, offersCount: number) {
    const queryBuilder = await getQueryBuilder<LookoutRequest>();
    return queryBuilder.update(LookoutRequest)
        .where("id = :id", {id: lookout.id})
        .set({offersProcessed: () => `"offersProcessed" + ${offersCount}`});

}

async function updateLookoutInitialLookoutFinished(lookout: LookoutRequest) {
    const queryBuilder = await getQueryBuilder<LookoutRequest>();
    queryBuilder.update(LookoutRequest)
        .where("id = :id", {id: lookout.id})
        .set({initialLookoutFinished: true});

}


export {
    parseOffer, offersOverlapsWithDB, offerMatchLookoutParams,
    updateLookoutOrdersProcessedCount, updateLookoutInitialLookoutFinished
};
