import {parse, subDays, addHours, setHours} from "date-fns";
import {pl} from "date-fns/locale";
import {last} from "lodash";

function reparseDistanceDateStr(str: string) {

    const now = setHours(addHours(new Date(), 2), 12);
    const trimmedStr = str.replace(/  /g, " ");
    if (str.includes("dzisiaj")) {
        const hhMM = last(trimmedStr.split(" "));
        return parse(hhMM, "HH:mm", now);
    } else if (str.includes("wczoraj")) {
        const hhMM = last(trimmedStr.split(" "));
        return parse(hhMM, "HH:mm", subDays(now, 1));
    } else {
        return parse(trimmedStr, "d MMM", new Date(), {locale: pl});
    }
}

export {reparseDistanceDateStr};
