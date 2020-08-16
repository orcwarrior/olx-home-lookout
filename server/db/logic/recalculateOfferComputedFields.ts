import knex from "/knexClient";
import {Offer} from "@db/schemas";
import {OfferDetailed} from "@logic/helpers/Offer";


async function recalculateLookoutOffersComputedFields(lookoutId): Promise<Offer[]> {

    console.log(`recalculateLookoutOffersComputedFields: `, lookoutId);
    // 1. Update price deviation
    knex<Offer>("Offers")
        .where({lookoutRequestId: lookoutId})
        .update({
            // @ts-ignore
            deviationAvgM2Price: knex.raw(`(SELECT offers_prices_perm2_deviation("Offers"))`),
        });

    // 2. Update rank
    return knex<Offer>("Offers")
        .where({lookoutRequestId: lookoutId})
        .update({
            // @ts-ignore
            rank: knex.raw(`(SELECT offers_rank("Offers"))`),
        })
        .returning("*");
}

async function recalculateOfferComputedFields(offerId): Promise<Offer> {

    // 1. Update price deviation
    await knex<Offer>("Offers")
        .where({id: offerId})
        .update({
            // @ts-ignore
            deviationAvgM2Price: knex.raw(`(SELECT offers_prices_perm2_deviation("Offers"))`),
        })

    // 2. Update rank
    const [offer] = await knex<Offer>("Offers")
        .where({id: offerId})
        .update({
            // @ts-ignore
            rank: knex.raw(`(SELECT offers_rank("Offers"))`),
        })
        .returning("*");
    return offer;
}

export {recalculateOfferComputedFields, recalculateLookoutOffersComputedFields};