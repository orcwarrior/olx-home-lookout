import {extractAttrs, OfferDetailedAttributes} from "./extractors/extractAttrs";
import {extractDescription} from "./extractors/extractRateDescription";
import {Offer, OfferDetailed, OfferDetailedPrices} from "./helpers/Offer";
import {addNotice} from "./helpers/notices";
import {decorateWithIndicators} from "./helpers/offerIndicators";
import {extractDescriptionPricing} from "./extractors/extractDescriptionPricing";


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
    return function (error, response, done) {
        if (error) {
            console.warn(error);
            addNotice(error);
        }

        const $: CheerioAPI = response.$;

        console.log(`scrapping detailOf: ${offer.url}`);
        const [attrs, rawAttrs] = extractAttrs(offer, $);
        const [description, descriptionRatingsDetails, descriptionRating] = extractDescription(offer, $);
        const detailedOffer = {
            ...offer,
            views: Number($(".offer-bottombar__counter > strong").text()),
            attrs, rawAttrs,
            prices: calculatePrices(offer, attrs, description),
            description, descriptionRatingsDetails,
            descriptionRating

        };
        resolveCb(decorateWithIndicators(detailedOffer));
        if (done) done();
    };
}

export {scrapeAdDetail};
