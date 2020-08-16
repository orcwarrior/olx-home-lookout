import {Column} from "typeorm";
import {OfferDetailedAttributes} from "../extractors/extractAttrs";
import {LookoutRequest} from "../../db/schemas";


type OFFER_TYPE = "RENT" | "PURCHASE" | "ROOM";
type Offer = {
    id?: number,
    title: string,
    url: string,
    mainImg: string,
    createdAt: Date,
    _priceBase: number,
    city: string,
    district?: string,
    offerType: OFFER_TYPE,
    lookoutRequestId: number
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

    @Column({type: "float"})
    areaPerRoom: number;
}

type OfferDetails = {
    attrs: OfferDetailedAttributes,
    gallery: string[],
    rawAttrs: any,
    prices: OfferDetailedPrices,
    views: number,
    description: string,
    descriptionRatingsDetails: object
    descriptionRating: number,
    indicators?: OfferIndicators,
    street?: string,
    location?: any
    hasExactAddress?: boolean,
    isReportHighlight?: boolean,
    mapFarImg?: string,
    mapCloseImg?: string,
    mapStreetImg?: string,

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
