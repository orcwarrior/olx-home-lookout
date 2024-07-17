import {fromPairs, trim} from "lodash";
import {parseValue} from "../../utils/parseValue";
import {normalizeAttributeKey, OfferDetailedAttributes, parseEstateType, ScrappedDetails} from "./";
import {CheerioAPI} from "@quackcode-dk/cheerio";

function extractAttrsOLX($: CheerioAPI): [OfferDetailedAttributes, any] {
    const paramsWrapper = $("#baxter-above-parameters").nextUntil("ul").next();
    const [_trash, ...paramsList] = paramsWrapper.find("li > p")
        .toArray()
        .map((el: any) => el?.children[0]?.data);
    // console.log(`paramsList: `, paramsList);
    // .map((el: any)=> el?.text())
    const detail: ScrappedDetails =
        fromPairs(
            paramsList
                .map(plainTxt => plainTxt.split(":"))
                .map(([key, value]) => [normalizeAttributeKey(key), trim(value)])
        );

    // console.log(`OLX.detailItems: `, detail);
    return [{
        area: parseValue(detail.powierzchnia?.replace(",", ".")),
        floor: parseValue(detail.poziom),
        furniture: (detail.umeblowane === "Tak"),
        rooms: parseValue(detail.liczba_pokoi) || 1,
        estateType: parseEstateType(detail),
        bonusRent: parseValue(detail.czynsz_dodatkowo),
        bail: parseValue(detail.kaucja)
    }, detail];
}

export {extractAttrsOLX}