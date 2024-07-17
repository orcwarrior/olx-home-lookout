import {deburr, snakeCase} from "lodash";
import {Column} from "typeorm";
import {Offer} from "../../helpers/Offer";
import {addNotice} from "../../helpers/notices";
import cheerio, {CheerioAPI} from "@quackcode-dk/cheerio";
import {extractAttrsOtoDom} from "./otodom";
import {extractAttrsOLX} from "./olx";



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

function normalizeAttributeKey(key) {
    return snakeCase(deburr(key));
}

function parseEstateType(detail): ESTATE_TYPE {
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
    let [attrs, rawAttrs] = offer.offerHost == "olx"
        ? extractAttrsOLX($)
        : extractAttrsOtoDom($);

    // DK: Lol @ the ppl
    if (attrs.bonusRent === offer._priceBase)
        attrs.bonusRent = 0;

    return [attrs, rawAttrs];
}

export type {ScrappedDetails};
export {extractAttrs, normalizeAttributeKey, parseEstateType, ESTATE_TYPE};
