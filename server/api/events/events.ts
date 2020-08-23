import {Router} from "express";
import {HasuraEvtPayload} from "./utils";
import {INSERT_Offers} from "./Offers/insert";
import {UPDATE_Offers} from "./Offers/update";
import {INSERT_LookoutRequests} from "./LookoutRequests/insert";
import {SCHEDULE_UpdateOffers} from "./schedule/SCHEDULE_UpdateOffers";

const router = Router();


const handlers = {
    UPDATE_Offers: UPDATE_Offers,
    INSERT_Offers: INSERT_Offers,
    INSERT_LookoutRequests: INSERT_LookoutRequests,
    SCHEDULE_UpdateOffers: SCHEDULE_UpdateOffers
};


router.post("/events", async (req, res) => {
    const payload: HasuraEvtPayload = req.body;
    // console.log(`payload: `, payload);
    // const row = payload.event.data.new || payload.event.data.old;
    const handlerKey = payload?.payload?.schedule_name || `${payload.event.op}_${payload.table.name}`;

    const hasEvtHandler = !!handlers[handlerKey];
    const handlerFn = (hasEvtHandler)
        ? handlers[handlerKey]
        : (() => ({msg: `No handler for: ${handlerKey}.`}));

    const handlerData = payload?.payload?.data || payload?.event?.data;
    const result = handlerFn(handlerData);

    return res
        .status(hasEvtHandler ? 200 : 500)
        .json({status: (hasEvtHandler) ? "ok" : "error", result});

});

export default router;
