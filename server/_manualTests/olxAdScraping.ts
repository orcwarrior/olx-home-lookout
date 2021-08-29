import {Offer} from "../logic/helpers/Offer";
import {scrapeAdDetail} from "../logic/scrapeAdDetails";
import {crawler} from "../logic/crawler";

const testOffer: Offer = {
    _priceBase: 0, createdAt: new Date(), lookoutRequestId: 0, mainImg: "<empty>",
    url: "https://www.olx.pl/d/oferta/mieszkanie-2-pokojowe-wolczanska-zamenhofa-lodz-centrum-CID3-IDL9lkm.html",
    title: "Mieszkanie 2-pokojowe Wólczańska/Zamenhofa Łódź, centrum",
    city: "<city>",
    offerType: "RENT"
};

(async () => {
    await crawler.direct({
        uri: testOffer.url,
        callback: scrapeAdDetail(console.log, testOffer)
    });
})();
