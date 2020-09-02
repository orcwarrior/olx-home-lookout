import {extractAttrs, OfferDetailedAttributes} from "./extractors/extractAttrs";
import {extractDescription} from "./extractors/extractRateDescription";
import {Offer, OfferDetailed, OfferDetailedPrices} from "./helpers/Offer";
import {addNotice} from "./helpers/notices";
import {decorateWithIndicators} from "./helpers/offerIndicators";
import {extractDescriptionPricing} from "./extractors/extractDescriptionPricing";
import {extractAdGallery} from "./extractors/extractAdGallery";
import {extractStreet} from "@logic/extractors/extractStreet";
import {getAddrGeocode} from "@api/geo/queryAddressGeo";
import {getMapImagesForOffer} from "@api/geo/generateOfferMapImages";

function scrapeAdTmpLog(offer, action) {
    process.stdout.write(`Scraping ad [${offer.url}] detail: /${action}\r`);
}

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

const waitMs = (ms) => new Promise(res => setTimeout(res, ms));


function buildScrapeAdDetail(resolveCb: (res: OfferDetailed) => void, offer: Offer) {
    return async function scrapeAdDetail (error, response, done) {
        if (error) {
            console.warn(error);
            addNotice(error);
        }

        const $: CheerioAPI = response.$;

        console.log(`scrapping detailOf: ${offer.url}`);
        const [attrs, rawAttrs] = extractAttrs(offer, $);
        const [description, descriptionRatingsDetails, descriptionRating] = extractDescription(offer, $);

        const street = extractStreet(offer.title, description);

        scrapeAdTmpLog(offer, `extracted street: ${street}`);
        const addrGeocode = await getAddrGeocode(`${offer.district} ${street || ""}`);
        scrapeAdTmpLog(offer, `processed geocode: ${addrGeocode}`);
        const [_, __, geoPoint, geoBounds] = addrGeocode;

        const mapImgs = await getMapImagesForOffer(offer, addrGeocode);
        scrapeAdTmpLog(offer, `processed mapImgs: ${addrGeocode}`);

        const detailedOffer: OfferDetailed = {
            ...offer,
            views: Number($(".offer-bottombar__counter > strong").text()),
            attrs, rawAttrs,
            prices: calculatePrices(offer, attrs, description),
            description, descriptionRatingsDetails,
            descriptionRating,
            gallery: extractAdGallery($),
            street,
            location: geoPoint && geoPoint.toTypeOrm(),
            hasExactAddress: street && !geoBounds,

            mapCloseImg: mapImgs.close?.img,
            mapFarImg: mapImgs.far?.img,
            mapStreetImg: mapImgs.street?.img,
        };
        scrapeAdTmpLog(offer, `pre-prepared offer: ${JSON.stringify(detailedOffer)}`);
        const decoratedOffer = decorateWithIndicators(detailedOffer);
        scrapeAdTmpLog(offer, `detailer offer: ${JSON.stringify(decoratedOffer)}`);

        resolveCb(decoratedOffer);
        if (done) done();
    };
};
const SCRAPE_DETAILS_TIMEOUT = 6000;

function scrapeAdDetail(resolveCb: (res: OfferDetailed) => void, offer: Offer) {
    const _scrapeAdDetails = buildScrapeAdDetail(resolveCb, offer);
    return (error, response, done)  => Promise.race([
        () => _scrapeAdDetails(error, response, done) ,
        () => waitMs(SCRAPE_DETAILS_TIMEOUT)
            .then(() => console.warn(`Scraping ${offer.url} resulted in timeout, not retrived in ${SCRAPE_DETAILS_TIMEOUT}ms!`))
    ]);

}

export {scrapeAdDetail};
