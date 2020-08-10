import {uniqBy} from "lodash";
import scrapeAdsList from "./scrapeAdsList";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {Offer} from "../db/schemas";
import {printNotices} from "./helpers/notices";
import {OfferDetailed} from "./helpers/Offer";

let scrappingFinished = false;

(async () => {
    const ads = scrapeAdsList();
    const offerBuilder = await getQueryBuilder<Offer>();
    ads.then((offers: Array<OfferDetailed>) => {

        const uniqOffers = uniqBy(offers, (ad: OfferDetailed) => ad.url);
        console.log(`offers collected: ${offers.length} - (uniq) --> ${uniqOffers.length}`);

        return Promise.all(uniqOffers.map(offer => offerBuilder
            .insert()
            .into(Offer)
        // @ts-ignore
            .values(offer)
            .execute()
            .catch(err => console.warn(err))
        )).then(dbOffers => dbOffers.filter(Boolean));
    })
        .then((dbData) => {
            scrappingFinished = true;
            console.log(`Rows inserted to DB: ${dbData.length}`);
        })
        .catch(err => {
            console.warn("Error caught: ", err);
        });


})();


const loopInterval = setInterval(() => {
    if (scrappingFinished) {
        clearInterval(loopInterval);
        printNotices();
        console.log("Job done, qutting...");
    }
}, 250);
