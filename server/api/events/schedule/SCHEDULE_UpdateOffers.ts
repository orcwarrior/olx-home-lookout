import {LookoutRequest, Offer} from "@db/schemas";
import {getQueryBuilder} from "@db/typeOrmInstance";
import scrapeAdsList from "../../../logic/scrapeAdsList";
import knex from"@root/knexClient";
import {recalculateLookoutOffersComputedFields} from "@db/logic/recalculateOfferComputedFields";
import {buildupReport} from "@logic/buildupReport";
import {uniqBy} from "lodash";
import {OfferDetailed} from "@logic/helpers/Offer";

async function SCHEDULE_UpdateOffers() {

    const offerLookouts = await knex<LookoutRequest>("LookoutRequests");

    console.log("Lookouts", offerLookouts);

    const newOffers = await Promise.all(
        offerLookouts.map(async (lookout: LookoutRequest) => {
            const prevOffers = await knex<Offer>("Offers"); // DK: To prevent duplicates
            const scrappedOffers = await scrapeAdsList(lookout, prevOffers);
            return scrappedOffers;
        })
    ).then(lookoutsOffers => lookoutsOffers.map(offers =>
        uniqBy(offers, (ad: OfferDetailed) => ad.url))
    );

    const newOffersFlat = newOffers.flat();
    console.log(`newOffers: `, newOffersFlat.length);

    const offerBuilder = await getQueryBuilder<Offer>();
    const _dbNewOffers: Offer[] | any = (await Promise.allSettled(
        newOffersFlat.map(offer => offerBuilder
            .insert()
            .into(Offer)
            .values(offer)
            .execute()
            .then(res => res?.identifiers[0])
            .catch(err => console.warn(err))
        )));
    const dbNewOffers = _dbNewOffers.map(res => res.value);
    // .map(rawResults => (rawResults).map(
    //     res => res?.value?.identifiers?[0]
    // ))
    console.log(`dbNewOffers: `, dbNewOffers);

    const lookoutsOffers = await Promise.all(
        offerLookouts
            .map(({id}) => recalculateLookoutOffersComputedFields(id))
    );

    await Promise.all(
        lookoutsOffers.map(lookoutOffers => {
            const lookout = offerLookouts.find(({id}) => id === lookoutOffers[0]?.lookoutRequestId);
            const newOffers = lookoutOffers.filter(off => dbNewOffers.some(nOff => nOff?.id === off.id));

            return buildupReport(lookout, lookoutOffers, newOffers);
        })
    );

};

// SCHEDULE_UpdateOffers();

export {SCHEDULE_UpdateOffers};
