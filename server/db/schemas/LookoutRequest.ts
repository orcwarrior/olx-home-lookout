import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany} from "typeorm";
import {OFFER_TYPE} from "../../logic/helpers/Offer";
import {Offer} from "./Offer";


@Entity()
export class LookoutRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Offer, req => req.lookoutRequest)
    offers: Offer[];

    @Column({default: "uuid_generate_v4()", unique: true})
    hash: string;

    @Column({unique: true})
    url: string;

    @Column({unique: true})
    email: string;

    @Column()
    priceSignificance: string;

    @Column()
    comfortSignificance: string;

    @Column({default: 0})
    offersProcessed: number;

    @Column({default: false})
    initialLookoutFinished: boolean;

    @Column()
    lookingFor: OFFER_TYPE;
}
