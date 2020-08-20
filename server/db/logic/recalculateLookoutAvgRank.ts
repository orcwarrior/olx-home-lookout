import knex from "@root/knexClient";
import {LookoutRequest, Offer} from "@db/schemas";
import {USER_REVIEW_STATUS} from "@db/schemas/Offer.enums";

async function recalculateLookoutAvgRank(lookoutId): Promise<LookoutRequest[]> {

    const [{count: offersCntDb}] = await knex<Offer>("Offers")
        .count({count: "*"})
        .where({lookoutRequestId: lookoutId})
        .andWhereNot({userReviewStatus: USER_REVIEW_STATUS.REJECTED});

    const offersCnt = Number(offersCntDb);
    const rejectedPart = 0.02; // 800 offers -> 16 lowest & 16 highest
    const offset = Math.round(offersCnt * rejectedPart);
    const limit = Math.round(offersCnt - offset * 2);
    console.log({offersCnt, offset, limit, offersCntDb})
    return knex<LookoutRequest>("LookoutRequests")
        .where({id: lookoutId})
        .update<LookoutRequest>({
            // @ts-ignore
            avgRank: knex<Offer>("Offers")
                .avg("rank")
                .where({lookoutRequestId: lookoutId})
                .andWhereNot({userReviewStatus: USER_REVIEW_STATUS.REJECTED})
                .orderBy("rank")
                .offset(offset)
                .limit(limit)
        })
        .returning("*");
}


export {recalculateLookoutAvgRank};
