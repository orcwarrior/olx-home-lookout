import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId} from "typeorm";
import {OFFER_TYPE, OfferDetailedPrices, OfferIndicators} from "../../logic/helpers/Offer";
import {OfferDetailedAttributes} from "../../logic/extractors/attrs";
import {LookoutRequest} from "./LookoutRequest";
import {LookoutReport} from "@db/schemas/LookoutReport";
import {GeographyType} from "@db/schemas/utils";
import {USER_REVIEW_STATUS} from "./Offer.enums";


@Entity()
class Offers_userreviewstatus_enum {
    @PrimaryGeneratedColumn()
    value: string;
}

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => LookoutRequest, req => req.id)
    @JoinColumn({name: "lookoutRequestId"})
    lookoutRequest: LookoutRequest;

    @Column()
    @RelationId((offer: Offer) => offer.lookoutRequest)
    lookoutRequestId: number;


    @ManyToOne(type => LookoutReport, report => report.id)
    @JoinColumn({name: "fromReportId"})
    fromReport: LookoutReport;

    @Column({nullable: true})
    @RelationId((offer: Offer) => offer.fromReport)
    fromReportId: number;


    @Column()
    title: string;

    @Column()
    url: string;

    @Column({nullable: true})
    mainImg: string;

    @Column({nullable: true, array: true, type: "text"})
    gallery: string[];

    @Column({default: () => "now()"})
    createdAt: Date;

    @Column()
    city: string;

    @Column({nullable: true})
    district?: string;

    @Column({nullable: true})
    street?: string;

    @Column({type: "geography", nullable: true, spatialFeatureType: "Point", srid: 4326})
    @JoinColumn()
    location?: GeographyType;

    @Column({nullable: true})
    mapFarImg?: string;

    @Column({nullable: true})
    mapCloseImg?: string;

    @Column({nullable: true})
    mapStreetImg?: string;

    @Column({nullable: true})
    hasExactAddress?: boolean;

    @Column({nullable: true})
    isReportHighlight?: boolean;

    @Column(type => OfferDetailedPrices)
    prices: OfferDetailedPrices;

    @Column(type => OfferDetailedAttributes)
    attrs: OfferDetailedAttributes;

    @Column(type => OfferIndicators)
    indicators: OfferIndicators;

    @Column()
    views: number;

    @Column({type: "float", nullable: true})
    rank: number;

    @Column({type: "jsonb", nullable: true})
    rawAttrs: any;

    @Column({type: "jsonb", nullable: true})
    descriptionRatingsDetails: any;

    @Column({type: "float"})
    descriptionRating: number;

    @Column()
    description: string;

    @Column({default: USER_REVIEW_STATUS.NONE})
    userReviewStatus: USER_REVIEW_STATUS;

    @Column({type: "jsonb", nullable: true, array: true})
    userNotes: any[];

    @Column()
    offerType: OFFER_TYPE;


    @Column({type: "float", nullable: true})
    deviationAvgM2Price: number;

}
