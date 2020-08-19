import {deburr, snakeCase, fromPairs} from "lodash";
import {Column} from "typeorm";
import {Offer} from "../helpers/Offer";
import {addNotice} from "../helpers/notices";
import {parseValue} from "../utils/parseValue";

type ESTATE_TYPE = "flat" | "apartament" | "house" | "old apartament" | "loft";

export class OfferDetailedAttributes {
    @Column()
    floor: number;

    @Column()
    furniture: boolean;

    @Column()
    estateType: ESTATE_TYPE; // Rodzaj zabudowy

    @Column({type: "float"})
    area: number;

    @Column()
    rooms: number;

    @Column({type: "float"})
    bonusRent: number;

    @Column({type: "float"})
    bail: number;

}

interface ScrappedDetails {
    [name: string]: string
}

function _normalizeKey(key) {
    return snakeCase(deburr(key));
}


function extractAttrsOLX($: CheerioAPI): [OfferDetailedAttributes, any] {
    const detail: ScrappedDetails = fromPairs($(".offer-details__item")
        .toArray()
        .map(itemEl => [
            _normalizeKey($(".offer-details__name", itemEl).text()),
            $(".offer-details__value", itemEl).text()])
    );
    // console.log(`OLX.detailItems: `, detail);
    return [{
        area: parseValue(detail.powierzchnia?.replace(",", ".")),
        floor: parseValue(detail.poziom),
        furniture: (detail.umeblowane === "Tak"),
        rooms: parseValue(detail.liczba_pokoi) || 1,
        estateType: _getEstateType(detail),
        bonusRent: parseValue(detail.czynsz_dodatkowo),
        bail: parseValue(detail.kaucja)
    }, detail];
}


function extractAttrsOtoDom($: CheerioAPI): [OfferDetailedAttributes, any] {
    const detail: ScrappedDetails = fromPairs($(".section-overview ul > li")
        .toArray()
        .map(itemEl => [
            _normalizeKey($(itemEl).text().split(":")[0]),
            $("strong", itemEl).text()])
    );
    // console.log(`OTODOM.detailItems: `, detail);
    if (!detail.powierzchnia) addNotice(new Error(`No 'powierzchnia' field: ${JSON.stringify(detail)}`));

    return [{
        area: parseValue(detail.powierzchnia?.replace(",", ".") || "0"),
        floor: parseValue(detail.pietro),
        furniture: (detail.stan_wykonczenia === "do zamieszkania"),
        rooms: parseValue(detail.liczba_pokoi) || 1,
        estateType: _getEstateType(detail),
        bonusRent: parseValue(detail.czynsz_dodatkowo),
        bail: parseValue(detail.kaucja)
    }, detail];
}


function _getEstateType(detail): ESTATE_TYPE {
    const type = detail.rodzaj_zabudowy?.toLowerCase() || "";
    if (type === "blok")
        return "flat";
    else if (type === "kamienica")
        return "old apartament";
    else if (type === "dom")
        return "house";
    else if (type.startsWith("apartament"))
        return "apartament";
    else if (type === "loft")
        return "loft";
    else {
        addNotice(new Error(`estate type: ${type} is unknown!`));
        return "flat";
    }
}

function extractAttrs(offer: Offer, $: CheerioAPI): [OfferDetailedAttributes, any] {
    let [attrs, rawAttrs] = offer.url.includes("olx")
        ? extractAttrsOLX($)
        : extractAttrsOtoDom($);
    // DK: Lol @ the ppl
    if (attrs.bonusRent === offer._priceBase)
        attrs.bonusRent = 0;

    return [attrs, rawAttrs];
}

export {extractAttrs, ESTATE_TYPE};
