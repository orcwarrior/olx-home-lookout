import {Router} from "express";
import {debounce} from "lodash";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {Offer} from "../db/schemas";

const router = Router();

type HasuraEvtPayload = {
    table: {
        schema: string,
        name: string,
    },
    id: string,
    event: {
        session_variables?: object,
        op: "INSERT" | "UPDATE" | "DELETE" | "MANUAL",
        data: {
            old?: object,
            new?: object
        }
    }
}

interface HandlerArgs<E> {
    new?: E,
    old?: E
}


const EVENT_HANDLER_DEBOUNCE = 250;
const EVENT_HANDLER_MAX_DEBOUNCE = 800;
let handlersBuffers = {};
let debouncedHandlers = {};

const handlers = {
    INSERT_Offers: bufferedHandler(async (data: HandlerArgs<Offer>) => {
        const queryBuilder = await getQueryBuilder<Offer>();
        queryBuilder
            .update(Offer)
            .set({
                deviationAvgM2Price: () => `(SELECT offers_prices_perm2_deviation(o) FROM "Offers" o WHERE o.id = ${data.new.id})`
            })
            .where("id = :id", {id: data.new.id})
            .execute()
            .catch(err => console.error(`Event handler error: ${err.toString()}`))
        return {};
    })
};

function bufferedHandler(handlerFn) {
    const handlerKey = handlerFn.name;
    const handlerWrapped = (data) => {
        console.log("Calling buffered event handler");
        handlersBuffers[handlerKey].map(handlerFn);
        handlersBuffers[handlerKey] = []; // clear buffer
        return null; // DK: Don't care about result data (would be possible to figure it out, but meh
    };

    const debouncedFn = debouncedHandlers[handlerKey] || debounce(handlerWrapped, EVENT_HANDLER_DEBOUNCE, {maxWait: EVENT_HANDLER_MAX_DEBOUNCE});
    const debouncedWrappedFn = (data) => {
        console.log(`buffered: ${data.new.id}`);
        handlersBuffers[handlerKey] = [...(handlersBuffers[handlerKey] || []), data];
        return debouncedFn(data);
    };
    return debouncedWrappedFn;


}

router.post("/events", async (req, res) => {
    const payload: HasuraEvtPayload = req.body;
    console.log(`payload: `, payload);
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
