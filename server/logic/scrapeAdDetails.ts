import {extractAttrs, OfferDetailedAttributes} from "./extractors/extractAttrs";
import {extractDescription} from "./extractors/extractRateDescription";
import {Offer, OfferDetailed, OfferDetailedPrices} from "./helpers/Offer";
import {addNotice} from "./helpers/notices";
import {decorateWithIndicators} from "./helpers/offerIndicators";
import {extractDescriptionPricing} from "./extractors/extractDescriptionPricing";
import {extractAdGallery} from "./extractors/extractAdGallery";
import {extractStreet} from "@logic/extractors/extractStreet";
import {getAddrGeocode} from "/api/geo/queryAddressGeo";
import {getMapImagesForOffer} from "/api/geo/generateOfferMapImages";


function calculatePrices(offer: Offer, attrs: OfferDetailedAttributes, description: string): OfferDetailedPrices {
    const base = offer._priceBase, additional = attrs.bonusRent || 0;

    const {descriptionPricingSum, descriptionPricingsDetails} = extractDescriptionPricing(description);
    // console.log(`descriptionPricingsDetails: `, descriptionPricingsDetails);
    return {
        base,
        additional,
        descriptionPricingSum, descriptionPricingsDetails,
        full: base + (additional || descriptionPricingSum),
        perM2: (attrs.area) ? (base + additional) / attrs.area : null,
    };
}

function scrapeAdDetail(resolveCb: (res: OfferDetailed) => void, offer: Offer) {
    return async function (error, response, done) {
        if (error) {
            console.warn(error);
            addNotice(error);
        }

        const $: CheerioAPI = response.$;

        console.log(`scrapping detailOf: ${offer.url}`);
        const [attrs, rawAttrs] = extractAttrs(offer, $);
        const [description, descriptionRatingsDetails, descriptionRating] = extractDescription(offer, $);

        const street = extractStreet(offer.title, description);
        const [_, __, geoPoint, geoBounds] = await getAddrGeocode(`${offer.district} ${street || ""}`);

        const mapImgs = await getMapImagesForOffer({...offer, street})
        const detailedOffer: OfferDetailed = {
            ...offer,
            views: Number($(".offer-bottombar__counter > strong").text()),
            attrs, rawAttrs,
            prices: calculatePrices(offer, attrs, description),
            description, descriptionRatingsDetails,
            descriptionRating,
            gallery: extractAdGallery($),
            street,
            location: geoPoint.toTypeOrm(),
            hasExactAddress: street && !geoBounds,

            mapCloseImg: mapImgs.close.img,
            mapFarImg: mapImgs.far.img,
            mapStreetImg: mapImgs.street?.img,

        };
        resolveCb(decorateWithIndicators(detailedOffer));
        if (done) done();
    };
}

export {scrapeAdDetail};
