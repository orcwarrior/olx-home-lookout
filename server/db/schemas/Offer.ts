import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId} from "typeorm";
import {OFFER_TYPE, OfferDetailedPrices, OfferIndicators} from "../../logic/helpers/Offer";
import {OfferDetailedAttributes} from "../../logic/extractors/extractAttrs";
import {LookoutRequest} from "./LookoutRequest";

enum USER_REVIEW_STATUS {
    NONE = "NONE",
    REJECTED = "REJECTED",
    BOOKMARKED = "BOOKMARKED",
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

    @Column()
    title: string;

    @Column({unique: true})
    url: string;

    @Column({nullable: true})
    mainImg: string;

    @Column()
    createdAt: Date;

    @Column()
    city: string;

    @Column({nullable: true})
    district?: string;

    @Column(type => OfferDetailedPrices)
    prices: OfferDetailedPrices;

    @Column(type => OfferDetailedAttributes)
    attrs: OfferDetailedAttributes;

    @Column(type => OfferIndicators)
    indicators: OfferIndicators;

    @Column()
    views: number;

    @Column({type: "jsonb", nullable: true})
    rawAttrs: any;

    @Column({type: "jsonb", nullable: true})
    descriptionRatingsDetails: any;

    @Column({type: "float"})
    descriptionRating: number;

    @Column()
    description: string;

    @Column({type: "enum", enum: USER_REVIEW_STATUS, default: USER_REVIEW_STATUS.NONE})
    userReviewStatus: USER_REVIEW_STATUS;

    @Column({nullable: true})
    userNote: string;

    @Column()
    offerType: OFFER_TYPE;


    @Column({type: "float", nullable: true})
    deviationAvgM2Price: number;

}
