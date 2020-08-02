import {LookoutRequest, Offer} from "../../../db/schemas";
import {getQueryBuilder} from "../../../db/typeOrmInstance";
import {bufferedHandler, HandlerArgs} from "../utils";
import scrapeAdsList from "../../../logic/scrapeAdsList";
import {OfferDetailed} from "../../../logic/helpers/Offer";
import {uniqBy} from "lodash";

const INSERT_LookoutRequest = bufferedHandler(async (data: HandlerArgs<LookoutRequest>) => {
    const offerBuilder = await getQueryBuilder<Offer>();

    const offers = await scrapeAdsList(data.new);

    const uniqOffers = uniqBy(offers, (ad: OfferDetailed) => ad.url);
    console.log(`offers collected: ${offers.length} - (uniq) --> ${uniqOffers.length}`);

    return Promise.all(uniqOffers.map(offer => offerBuilder
        .insert()
        .into(Offer)
        .values(offer)
        .execute()
        .catch(err => console.warn(err))
    ));

});

export {INSERT_LookoutRequest};
