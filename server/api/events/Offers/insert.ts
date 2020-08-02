import {Offer} from "../../../db/schemas";
import {getQueryBuilder} from "../../../db/typeOrmInstance";
import {bufferedHandler, HandlerArgs} from "../utils";

const INSERT_Offers = bufferedHandler(async (data: HandlerArgs<Offer>) => {
    const queryBuilder = await getQueryBuilder<Offer>();
    queryBuilder
        .update(Offer)
        .set({
            deviationAvgM2Price: () => `(SELECT offers_prices_perm2_deviation(o) FROM "Offers" o WHERE o.id = ${data.new.id})`
        })
        .where("id = :id", {id: data.new.id})
        .execute()
        .catch(err => console.error(`Event handler error: ${err.toString()}`));
    return {};

});

export {INSERT_Offers};
