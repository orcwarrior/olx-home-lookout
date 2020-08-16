import knex from "/knexClient";
import {LookoutRequest} from "@db/schemas";

async function recalculateLookoutAvgRank(lookoutId): Promise<LookoutRequest[]> {

    // 1. Update price deviation
    return knex<LookoutRequest>("LookoutRequests")
        .where({id: lookoutId})
        .update<LookoutRequest>({
            // @ts-ignore
            avgRank: knex.raw(`(SELECT avg(rank) FROM "Offers" WHERE "lookoutRequestId" = ${lookoutId})`),
        });
}


export {recalculateLookoutAvgRank};
