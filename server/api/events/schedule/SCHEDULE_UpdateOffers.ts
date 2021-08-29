import {LookoutRequest, Offer} from "@db/schemas";
import {getQueryBuilder} from "@db/typeOrmInstance";
import scrapeAdsList from "../../../logic/scrapeAdsList";
import knex from"@root/knexClient";
import {recalculateLookoutOffersComputedFields} from "@db/logic/recalculateOfferComputedFields";
import {buildupReport} from "@logic/buildupReport";
import {uniqBy} from "lodash";
import {OfferDetailed} from "@logic/helpers/Offer";
import {getHours} from "date-fns"
import {recalculateLookoutAvgRank} from "@db/logic/recalculateLookoutAvgRank";

const waitMs = (ms) => new Promise(res => setTimeout(res, ms));
async function SCHEDULE_UpdateOffers() {

    // if (noDisturbHours())
    //     return console.warn("Report was rejected due that we're at night currently :)")


    const offerLookouts: LookoutRequest[] = await knex<LookoutRequest>("LookoutRequests");

    console.log("Lookouts", offerLookouts);

    const newOffers = await Promise.all(
        offerLookouts.map(async (lookout: LookoutRequest): Promise<OfferDetailed[]> => {
            const prevOffers = await knex<Offer>("Offers"); // DK: To prevent duplicates
            return await scrapeAdsList(lookout, prevOffers);
        })
    ).then((lookoutsOffers) => lookoutsOffers.flatMap(offers =>
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
        lookoutsOffers.map(async lookoutOffers => {
            const lookout = offerLookouts.find(({id}) => id === lookoutOffers[0]?.lookoutRequestId);
            await recalculateLookoutAvgRank(lookout.id)
            const newOffers = lookoutOffers.filter(off => dbNewOffers.some(nOff => nOff?.id === off.id));

            await waitMs(2000);
            return buildupReport(lookout, lookoutOffers, newOffers);
        })
    );

    function noDisturbHours() {
        const [NO_DISTRURB_MIN, NO_DISTRURB_MAX] = [1,7];
        const curHour = getHours(new Date());
        return NO_DISTRURB_MIN < curHour && curHour < NO_DISTRURB_MAX;
    }
};

// SCHEDULE_UpdateOffers();

export {SCHEDULE_UpdateOffers};
