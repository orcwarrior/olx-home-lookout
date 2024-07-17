import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import {OFFER_TYPE} from "../../logic/helpers/Offer";
import {Offer} from "./Offer";


@Entity({synchronize: true})
export class LookoutRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Offer, req => req.id)
    offers: Offer[];

    @Index()
    @Column({default: () => "gen_random_uuid()", unique: true})
    hash: string;

    @Column({unique: true})
    url: string;

    @Column({unique: true})
    email: string;

    @Column({type: "float", comment: "0-1 float value on price importance to the final rank"})
    priceSignificance: number;

    @Column({type: "float", comment: "0-1 float value on comfort importance to the final rank"})
    comfortSignificance: number;

    @Column({type: "float", nullable: true})
    avgRank: number;

    @Column({default: 0})
    offersProcessed: number;

    @Column({default: () => "now()"})
    createdAt: Date;

    @Column({default: false})
    initialLookoutFinished: boolean;

    @Column({default: false})
    emailSubscriptionCanceled: boolean;

    @Column()
    lookingFor: OFFER_TYPE;
}
