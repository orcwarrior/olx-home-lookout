import {fromPairs} from "lodash";
import {normalizeAttributeKey, OfferDetailedAttributes, parseEstateType, ScrappedDetails} from "./";
import {parseValue} from "../../utils/parseValue";
import {addNotice} from "../../helpers/notices";
import {CheerioAPI} from "@quackcode-dk/cheerio";

function nullUnknownText(text: string) {
    return text === "Zapytaj" ? null : text
}

function extractAttrsOtoDom($: CheerioAPI): [OfferDetailedAttributes, any] {

    const {detailsList} = $(`header + div > div`).extract({
        detailsList: [{
            selector: "div[aria-label]",
            value: (el, key) => ([[
                normalizeAttributeKey(el.attribs["aria-label"]),
                nullUnknownText($("div:last", el).prop("innerText")),
            ]])
        }]
    });
    const details = Object.fromEntries(detailsList);
    if (!details.powierzchnia) addNotice(new Error(`No 'powierzchnia' field: ${JSON.stringify(details)}`));

    const extraAttributesList = $("div[data-cy='ad.additional-information.table']").extract({
        extras: [{
            selector: "div[aria-label]",
            value: (el, key) => ([[
                normalizeAttributeKey(el.attribs["aria-label"]),
                nullUnknownText($("div:last", el).prop("innerText")),
            ]])
        }]
    })
    const extraAttributes = Object.fromEntries(extraAttributesList.extras);


    const [floor, topFloor] = details.pietro.split("/")
    if (topFloor) details.topFloor = topFloor;


    return [{
        area: parseValue(details.powierzchnia),
        floor: parseValue(floor ?? details.pietro),
        furniture: (details.stan_wykonczenia === "do zamieszkania"),
        rooms: parseValue(details.liczba_pokoi) || 1,
        estateType: parseEstateType(details),
        bonusRent: parseValue(details.czynsz),
        bail: parseValue(details.kaucja)
    }, {...details, ...extraAttributes}];
}

export {extractAttrsOtoDom};