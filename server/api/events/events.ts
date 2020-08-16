import {Router} from "express";
import {HasuraEvtPayload} from "./utils";
import {INSERT_Offers} from "./Offers/insert";
import {INSERT_LookoutRequests} from "./LookoutRequests/insert";

const router = Router();


const handlers = {
    INSERT_Offers: INSERT_Offers,
    INSERT_LookoutRequests: INSERT_LookoutRequests
};


router.post("/events", async (req, res) => {
    const payload: HasuraEvtPayload = req.body;
    // console.log(`payload: `, payload);
    // const row = payload.event.data.new || payload.event.data.old;
    const handlerKey = `${payload.event.op}_${payload.table.name}`;
    const hasEvtHandler = !!handlers[handlerKey];
    const handlerFn = (hasEvtHandler)
        ? handlers[handlerKey]
        : (() => ({msg: `No handler for: ${handlerKey}.`}));

    const result = handlerFn(payload.event.data);

    return res
        .status(hasEvtHandler ? 200 : 500)
        .json({status: (hasEvtHandler) ? "ok" : "error", result});

});

export default router;
