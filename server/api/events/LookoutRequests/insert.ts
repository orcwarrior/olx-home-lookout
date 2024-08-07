import {LookoutRequest, Offer} from "../../../db/schemas";
import {getQueryBuilder} from "../../../db/typeOrmInstance";
import {bufferedHandler, HandlerArgs} from "../utils";
import scrapeAdsList from "../../../logic/scrapeAdsList";
import {OfferDetailed} from "../../../logic/helpers/Offer";
import {uniqBy} from "lodash";

const INSERT_LookoutRequests = bufferedHandler(async (data: HandlerArgs<LookoutRequest>) => {
    const offerQueryBuilder = await getQueryBuilder<Offer>();

    const offers = await scrapeAdsList(data.new);

    const uniqOffers = uniqBy(offers, (ad: OfferDetailed) => ad.url);
    console.log(`offers collected: ${offers.length} - (uniq) --> ${uniqOffers.length}`);

    return Promise.allSettled(uniqOffers.map(offer => offerQueryBuilder
        .insert()
        .into(Offer)
    // @ts-ignore
        .values(offer)
        .execute()
        .catch(err => console.warn(err))
    ));

});

export {INSERT_LookoutRequests};
