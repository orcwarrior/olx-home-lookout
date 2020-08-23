import knex from "@root/knexClient";
import {LookoutRequest, Offer} from "@db/schemas";
import {USER_REVIEW_STATUS} from "@db/schemas/Offer.enums";

async function recalculateLookoutAvgRank(lookoutId): Promise<LookoutRequest[]> {

    const [{count: offersCntDb}] = await knex<Offer>("Offers")
        .count({count: "*"})
        .where({lookoutRequestId: lookoutId})
        .andWhereNot({userReviewStatus: USER_REVIEW_STATUS.REJECTED});



    const offersCnt = Number(offersCntDb);
    const rejectedPart = 0.03; // 800 offers -> 16 lowest & 16 highest
    const offset = Math.round(offersCnt * rejectedPart);
    const limit = Math.round(offersCnt - offset * 2);
    console.log({offersCnt, offset, limit, offersCntDb})

    const normalizedAvgRankSQL = `
    (select avg(normalized_offers.rank)
    FROM (
        SELECT "rank" FROM "Offers" 
        WHERE ("lookoutRequestId" = ${lookoutId} AND NOT "userReviewStatus" = '${USER_REVIEW_STATUS.REJECTED}') 
        ORDER BY "rank" ASC 
        LIMIT ${limit} offset ${offset}) as normalized_offers)
`

    return knex<LookoutRequest>("LookoutRequests")
        .where({id: lookoutId})
        .update<LookoutRequest>({
            // @ts-ignore
            avgRank: knex.raw(normalizedAvgRankSQL)
        })
        .returning("*");
}


export {recalculateLookoutAvgRank};
