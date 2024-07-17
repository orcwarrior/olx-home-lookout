import {describe, expect, test} from "@jest/globals";

import  CheerioAPI from "@quackcode-dk/cheerio";
import {Offer} from "../../helpers/Offer";
import {extractAttrs} from "./";
import {mockedOtodomOfferHtml} from "../../../.mocks/offerOtodomHtml";
import {offerOlxHtml} from "../../../.mocks/offerOlxHtml";


const mockedOtodomOffer: Offer = {
    createdAt: undefined, mainImg: "", wasRefreshed: false,
    title: "test otodom",
    url: "https://www.otodom.pl/pl/oferta/mieszkanie-family-plus-4-pokojowe-z-balkonem-ID4o0wi.html",
    _priceBase: 3350,
    city: "test city",
    district: "test district",
    offerType: "RENT",
    offerHost: "otodom",
    lookoutRequestId: 1
};
describe("extractAttrsOtoDom", () => {
    test("should extract attrs from otodom offer", () => {

        const $ = CheerioAPI.load(mockedOtodomOfferHtml);
        const attrs = extractAttrs(mockedOtodomOffer, $ as any);
        console.log(attrs);
    });
});

const mockedOlxOffer: Offer = {
    createdAt: undefined, mainImg: "", wasRefreshed: false,
    title: "test olx",
    url: "https://www.olx.pl/d/oferta/dwa-pokoje-45-m2-w-centrum-lodzi-z-parkingiem-srodmiescie-CID3-IDMPrxf.html",
    _priceBase: 2300,
    city: "test city",
    district: "test district",
    offerType: "RENT",
    offerHost: "olx",
    lookoutRequestId: 1
};
describe("extractAttrsOlx", () => {

    const $ = CheerioAPI.load(offerOlxHtml);
    const attrs = extractAttrs(mockedOlxOffer, $ as any);
    console.log(attrs);
})