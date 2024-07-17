import {OfferDetailed, OfferDetails} from "./Offer";
import {ESTATE_TYPE} from "../extractors/attrs";

function _rateEstateTypeComfort(type: ESTATE_TYPE) {
    switch (type) {
    case "apartament":
    case "loft":
        return 20;
    case "house":
        return 20;
    case "flat":
        return 10;
    case "old apartament":
        return -5;
    }
}

function decorateWithIndicators(offer: OfferDetailed): OfferDetailed {
    const SENSIBLE_AREA_PER_ROOM = 16;
    const areaPerRoom = offer.attrs.area / (offer.attrs.rooms || 1);
    const comfort = offer.descriptionRating +
        (offer.attrs.area) +
        offer.attrs.rooms * 6 +
        (SENSIBLE_AREA_PER_ROOM - areaPerRoom) +
        (offer.attrs.furniture ? 5 : -35)
        + _rateEstateTypeComfort(offer.attrs.estateType);
    const indicators = {
        comfort,
        areaPerRoom,
        deal: (comfort / 1.5) / offer.prices.perM2
    };
    return {...offer, indicators};
}

export {decorateWithIndicators};
