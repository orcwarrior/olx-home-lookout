import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, JoinColumn, RelationId} from "typeorm";
import {OFFER_TYPE} from "../../logic/helpers/Offer";
import {Offer} from "./Offer";
import {LookoutRequest} from "@db/schemas/LookoutRequest";


@Entity()
export class LookoutReport {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({default: () => "gen_random_uuid()", unique: true})
    hash: string;

    @Column({type: "float"})
    avgRank: number;

    @Column({type: "float"})
    avgRankTrend: number;

    @Column()
    offersSince: Date;

    @Column({default: () => "now()"})
    createdAt: Date;

    @ManyToOne(type => LookoutRequest, req => req.id)
    @JoinColumn({name: "lookoutRequestId"})
    lookoutRequest: LookoutRequest;

    @Column()
    @RelationId((report: LookoutReport) => report.lookoutRequest)
    lookoutRequestId: number;

    @OneToMany(type => Offer, req => req.id)
    offers: Offer[];


}
