import {Column} from "typeorm";
import {OfferDetailedAttributes} from "../extractors/extractAttrs";


type OFFER_TYPE = "RENT" | "PURCHASE" | "ROOM";
type Offer = {
    title: string,
    url: string,
    mainImg: string,
    createdAt: Date,
    _priceBase: number,
    district: string,
    offerType: OFFER_TYPE
}

class OfferDetailedPrices {
    @Column({type: "float"})
    base: number;

    @Column({type: "float"})
    additional: number;

    @Column({type: "float"})
    full: number;

    @Column({type: "float", default: 0})
    descriptionPricingSum: number;

    @Column({type: "jsonb", nullable: true})
    descriptionPricingsDetails: object;

    @Column({type: "float"})
    perM2: number;
}

class OfferIndicators {
    @Column({type: "float"})
    comfort: number;

    @Column({type: "float"})
    deal: number;
}

type OfferDetails = {
    attrs: OfferDetailedAttributes,
    rawAttrs: any,
    prices: OfferDetailedPrices,
    views: number,
    description: string,
    descriptionRatingsDetails: object
    descriptionRating: number,
    indicators?: OfferIndicators
}


interface OfferDetailed extends Offer, OfferDetails {
    // attrs: OfferDetailedAttributes,
    // rawAttrs: any,
    // priceNegotiable: boolean,
    // prices: OfferDetailedPrices,
    // views: number,
    // description: string,
    // descriptionRatings: object
}


export {
    Offer, OfferDetails, OfferDetailed,
    OFFER_TYPE, OfferDetailedPrices,
    OfferIndicators
};
