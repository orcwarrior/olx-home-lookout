import React from "react";
import { useCallback, useEffect, useState } from "react";

export default function useLongPress(pressCallback = () => null, longPressMs = 300, preventDefault = false,
    clickCallback = () => null, refId) {

    const [startLongPress, setStartLongPress] = useState(null);
    const [pressCbCalled, setPressCbCalled] = useState(false);
    const [pressInitTS, setPressInitTS] = useState(-1);
    const [longPressTimerId, setLongPressTimerId] = useState(null);
    const [touchMove, setTouchMove] = useState(false);

    const CLICK_MAX_DUR = 100;

    useEffect(() => {
        // console.log({startLongPress, pressCbCalled, longPressTimerId, refId});
        if (startLongPress && !longPressTimerId) {

            setTouchMove(false);
            setPressCbCalled(false);
            setPressInitTS(new Date().valueOf());

            setLongPressTimerId(setTimeout(() => {
                setPressCbCalled(true);
                pressCallback(startLongPress);
            }, longPressMs));
        } else if (longPressTimerId) {

            if (!startLongPress) {
                if (pressCbCalled) // "DE-PRESS" event
                    pressCallback(startLongPress);
                else {
                    const currentTS = new Date().valueOf();
                    // "CLICK" event remove press timeout
                    if (currentTS - pressInitTS < CLICK_MAX_DUR && !touchMove)
                        clickCallback();
                    setPressInitTS(-1);
                }
                // Clear timer id as it was depressed
                console.log("Clear timer id as it was depressed");
                setLongPressTimerId(clearTimeout(longPressTimerId));
            }
        }

        return () => {
            // clearTimeout(longPressTimerId);
            // setLongPressTimerId(null);
        };
    }, [pressCallback, clickCallback, longPressTimerId, longPressMs, startLongPress, pressCbCalled, refId, pressInitTS, touchMove]);

    function checkEvtPrevention(evt) {
        if (preventDefault) {
            const {cancelable, type} = evt;
            if ((type === "touchstart" || !cancelable) && !startLongPress) {
                return false;
            }
            // console.log(`evt:: `, {cancelable, type});

            evt.preventDefault();
            evt.stopPropagation();
            evt.cancelBubble = true;
            evt.returnValue = false;
            if (evt.stopImmediatePropagation)
                evt.stopImmediatePropagation();
            return false;
        }
    }

    const start = useCallback((evt) => {
        setStartLongPress(true);
        checkEvtPrevention(evt);

    }, [checkEvtPrevention]);
    const stop = useCallback((evt) => {
        setStartLongPress(false);
        checkEvtPrevention(evt);
    }, [checkEvtPrevention]);

    const moveHandler = useCallback(() => {
        // DK: So no click will be fired on touchend
        setTouchMove(true);
        if (pressCbCalled || !longPressTimerId) {
            const ts = new Date().valueOf();
            if (ts - (longPressMs - 50) < setPressInitTS)
                return;
        }


        clearTimeout(longPressTimerId);
        setLongPressTimerId(setTimeout(() => pressCallback(startLongPress), longPressMs));
    }, [longPressTimerId, longPressMs, pressCallback, pressCbCalled, startLongPress]);

    return React.useMemo(() => ({
        // onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
        onTouchMove: moveHandler,
        onContextMenu: checkEvtPrevention
    }), [stop, start, moveHandler, checkEvtPrevention]);
}
