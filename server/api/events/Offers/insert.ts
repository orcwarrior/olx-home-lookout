import {Offer} from "../../../db/schemas";
import {bufferedHandler, HandlerArgs} from "../utils";
import {recalculateOfferComputedFields} from "@db/logic/recalculateOfferComputedFields";
import {recalculateLookoutAvgRank} from "@db/logic/recalculateLookoutAvgRank";
import {debounce} from "lodash";


const smartRecalculateLookoutAvgRank = debounce(recalculateLookoutAvgRank, 2000);
const INSERT_Offers = bufferedHandler(async (data: HandlerArgs<Offer>) => {

    const offerId = data?.new?.id;
    const recalcOffer = await recalculateOfferComputedFields(offerId);
    smartRecalculateLookoutAvgRank(data?.new?.lookoutRequestId);
    return recalcOffer;

});

export {INSERT_Offers};
