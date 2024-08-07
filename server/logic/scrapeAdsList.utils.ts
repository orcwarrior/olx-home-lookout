import {Offer, OFFER_TYPE} from "./helpers/Offer";
import {reparseDistanceDateStr} from "./helpers/reparseDistanceDateStr";
import {deburr, last} from "lodash";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {LookoutRequest, Offer as OfferDB} from "../db/schemas";
import {CheerioAPI, Element} from "@quackcode-dk/cheerio";


const ROOM_RENT_RGX = /pokoje? |room /i;

function parseOffer(el: Element, $: CheerioAPI, lookout: LookoutRequest): Offer {
    const sub$ = (selector) => $(selector, el);
    const title = sub$(`*[data-cy="ad-card-title"] a > h6`).text();
    const _priceBase = parseFloat(sub$("*[data-testid=\"ad-price\"]").text().replace(/zł| /gi, ""));
    const urlNormalized = sub$("*[data-cy=\"ad-card-title\"] a").attr("href")
        .replace(/\??#.+$/, "")
        .replace("?","");

    const locationAndDate = sub$(`*[data-testid="location-date"]`).text();
    const [location, dateDescription] = locationAndDate.split(" - ");
    const [city, district] = location.split(",").map(s => s.trim());
    const [_date, _refreshedDate] = dateDescription.split("Odświeżono ");
    const wasRefreshed = !!_refreshedDate; // DK: Dates in 2 item means "Odświeżono " was found
    const offerHost = urlNormalized.includes("otodom") ? "otodom" : "olx";

    return {
        title,
        url: offerHost === "olx" ? ("https://www.olx.pl" + urlNormalized) : urlNormalized,
        mainImg: sub$("a img").attr("src"),
        _priceBase,
        createdAt: reparseDistanceDateStr(_date ?? _refreshedDate),
        city: city.trim(),
        district: district && `${city.trim()}, ${district.trim()}`,
        offerType: _getOfferType(),
        offerHost,
        lookoutRequestId: lookout.id,
        wasRefreshed
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
