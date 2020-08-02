import {debounce} from "lodash";

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

let handlersBuffers = {};
let debouncedHandlers = {};

const EVENT_HANDLER_DEBOUNCE = 250;
const EVENT_HANDLER_MAX_DEBOUNCE = 800;


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


export {HasuraEvtPayload, HandlerArgs, bufferedHandler};
