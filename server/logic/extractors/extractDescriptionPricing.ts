import {OfferDetailedPrices} from "../helpers/Offer";
import {deburr, sum} from "lodash";
import {parseValue} from "../utils/parseValue";


const COSTS_RGX = /(Oplaty|platnos|czynsz)(.+?)(\d+)|(\d+)(.+?)(Oplaty|platnos|czynsz)/gi;

type DescriptionPricings = Pick<OfferDetailedPrices, "descriptionPricingSum" | "descriptionPricingsDetails">;

function extractDescriptionPricing(description: string): DescriptionPricings {
    const normalizedDesc = deburr(description);

    let descriptionPricingsDetails = {};
    for (const match of normalizedDesc.matchAll(COSTS_RGX)) {
        const [name, __, _name, val, valAlt, nameAlt] = match;
        descriptionPricingsDetails[name || nameAlt] = parseValue(val || valAlt);
    }

    return {
        descriptionPricingsDetails,
        descriptionPricingSum: sum(Object.values(descriptionPricingsDetails))
    };

}


export {extractDescriptionPricing};
