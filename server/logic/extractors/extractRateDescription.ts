import {Offer} from "../helpers/Offer";
import CheerioAPI = cheerio.CheerioAPI;

const OFFER_DESCRIPTION_RATINGS = {
    // Negative
    "remontu": -20,
    "kamienica": -5,
    "kwatery|agancj[ai] prac|dla pracownik\w": -60,

    // Positive
    "remoncie": 7,
    "now[ae]": 3,
    "klima": 6,
    "internet": 5,
    "biurko|gabinet": 4,
    "balkon": 3,
    "komórk[i|a]|piwnica": 3,
    "gara[ż|z]": 5,
    "parking": 5,
    "g[ł|l]ad[z|ź]": 2,
    "luksusowy": 2,
    "tv|telew": 1.5,
    "świe[ż|z]": 1,
    "mikrof": 0.5,
    "lodówk": 0.5,
    "wyposażon[ae]": 0.5,
    "gotow[ey]": 0.5,
    "pralka": 0.25,

};

function rateDescription(description: string): object {
    return Object.keys(OFFER_DESCRIPTION_RATINGS).reduce((acc, keyword) => ({
        ...acc,
        [keyword]: description.match(new RegExp(keyword, "i")) ? OFFER_DESCRIPTION_RATINGS[keyword] : 0
    }), {});
}

function extractDescription(offer: Offer, $: CheerioAPI): [string, object, number] {
    const description = $(`div[data-cy="ad_description"] > div`).text();
    const detailedRatedDesc = rateDescription(`${offer.title} ${description}`);
    const descRatingSum = Object.values(detailedRatedDesc).reduce((sum, n) => (sum + n), 0);

    return [description, detailedRatedDesc, descRatingSum];

}


export {extractDescription};
