import {uniqBy} from "lodash";
import scrapeAdsList from "./scrapeAdsList";
import {getQueryBuilder} from "../db/typeOrmInstance";
import {Offer} from "../db/schemas";
import {printNotices} from "./helpers/notices";

let scrappingFinished = false;

(async () => {
    const ads = scrapeAdsList();
    const offerBuilder = await getQueryBuilder<Offer>();
    ads.then((offers: Array<Offer>) => {
        const uniqOffers = uniqBy(offers, (ad: Offer) => ad.url);

        return Promise.all(uniqOffers.map(offer => offerBuilder
            .insert()
            .into(Offer)
            .values(offer)
            .execute()
        ));
    })
        .then((dbData) => {
            scrappingFinished = true;
            console.log(`dbData: `, dbData);
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
    } else console.log("...");
}, 250);
