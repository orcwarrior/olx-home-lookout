import {Offer, OFFER_TYPE} from "./helpers/Offer";
import {reparseDistanceDateStr} from "./helpers/reparseDistanceDateStr";
import {deburr, last} from "lodash";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {LookoutRequest, Offer as OfferDB} from "../db/schemas";
import CheerioAPI = cheerio.CheerioAPI;
import CheerioElement = cheerio.Element;



const ROOM_RENT_RGX = /pokoje? |room /i;

function parseOffer(el: CheerioElement, $: CheerioAPI, lookout: LookoutRequest): Offer {
    const sub$ = (selector) => $(selector, el);
    const title = sub$("a > strong").text();
    const _priceBase = parseFloat(sub$(".price > strong").text().replace(/zł| /gi, ""));
    const urlNormalized = sub$("td[valign=top] a").attr("href").replace(/\??#.+$/, "").replace("?","");
    const [city, district] = sub$("[data-icon=location-filled]").parent().text().split(",");
    return {
        title,
        url: urlNormalized,
        mainImg: sub$("img.fleft").attr("src"),
        _priceBase,
        createdAt: reparseDistanceDateStr(sub$("[data-icon=clock]").parent().text()),
        city: city.trim(),
        district: district && `${city.trim()}, ${district.trim()}`,
        offerType: _getOfferType(),
        lookoutRequestId: lookout.id
    };

    function _getOfferType(): OFFER_TYPE {
        if (ROOM_RENT_RGX.test(deburr(title)) && _priceBase < 1200)
            return "ROOM";
        else if (title.toLowerCase().includes("wynaj") || _priceBase < 20000)
            return "RENT";
        else return "PURCHASE";
    }
}

function offerMatchLookoutParams(lookout: LookoutRequest) {
    return (offer: Offer) => offer.offerType === lookout.lookingFor;
}

async function offersOverlapsWithDB(offers: Array<Offer>) {
    const queryBuilder = await getQueryBuilder<Offer>();
    const lastOffer = last(offers);
    const lastOfferInDb = await queryBuilder
        .select()
        .from(OfferDB, "offer")
        .where("offer.lookoutRequestId = :lookoutRequestId", {lookoutRequestId: lastOffer.lookoutRequestId})
        .andWhere("offer.url = :url", {url: lastOffer.url})
        // .orWhere("offer.url = :url2", {url2: lastOffer.url})
        .getCount();

    return !!lastOfferInDb; // DK: check for 2's should be enough even with promoted offers
}

async function updateLookoutOrdersProcessedCount(lookout: LookoutRequest, offersCount: number) {
    const queryBuilder = await getQueryBuilder<LookoutRequest>();
    return queryBuilder.update(LookoutRequest)
        .where("id = :id", {id: lookout.id})
        .set({offersProcessed: () => `"offersProcessed" + ${offersCount}`})
        .execute()
        .catch(err => console.warn("Update Lookout err: ", err));

}

async function updateLookoutInitialLookoutFinished(lookout: LookoutRequest) {
    const queryBuilder = await getQueryBuilder<LookoutRequest>();
    queryBuilder.update(LookoutRequest)
        .where("id = :id", {id: lookout.id})
        .set({initialLookoutFinished: true})
        .execute()
        .catch(err => console.warn("Update Lookout err: ", err));

}


export {
    parseOffer, offersOverlapsWithDB, offerMatchLookoutParams,
    updateLookoutOrdersProcessedCount, updateLookoutInitialLookoutFinished
};
