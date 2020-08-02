import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";
import {OFFER_TYPE} from "../../logic/helpers/Offer";


@Entity()
export class LookoutRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    email: string;

    @Column()
    price_significance: string;

    @Column()
    comfort_significance: string;

    @Column()
    looking_for: OFFER_TYPE;
}
