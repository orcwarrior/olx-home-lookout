import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany} from "typeorm";
import {OFFER_TYPE} from "../../logic/helpers/Offer";
import {Offer} from "./Offer";


@Entity()
export class LookoutRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Offer, req => req.id)
    offers: Offer[];

    @Column({default: () => "gen_random_uuid()", unique: true})
    hash: string;

    @Column({unique: true})
    url: string;

    @Column({unique: true})
    email: string;

    @Column()
    priceSignificance: number;

    @Column()
    comfortSignificance: number;

    @Column({default: 0})
    offersProcessed: number;

    @Column({default: false})
    initialLookoutFinished: boolean;

    @Column()
    lookingFor: OFFER_TYPE;
}
