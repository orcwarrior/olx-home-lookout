import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {OFFER_TYPE, OfferDetailedPrices, OfferIndicators} from "../../logic/helpers/Offer";
import {OfferDetailedAttributes} from "../../logic/extractors/extractAttrs";
import {LookoutRequest} from "./LookoutRequest";


@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => LookoutRequest, req => req.offers)
    lookoutRequest: LookoutRequest

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

    @Column({ type: "jsonb", nullable: true })
    rawAttrs: any;

    @Column({ type: "jsonb", nullable: true })
    descriptionRatingsDetails: any;

    @Column({type: "float"})
    descriptionRating: number;


    @Column()
    description: string;

    @Column()
    offerType: OFFER_TYPE;


    @Column({ type: "float", nullable: true })
    deviationAvgM2Price: number;

}
