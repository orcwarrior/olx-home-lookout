import * as Jimp from "jimp";
import {api} from "@config/index";
import {GeoBounds} from "@api/geo/queryAddressGeo";
import {isUndefined} from "lodash";
import fetch from "node-fetch";
import * as fs from "fs";
import * as path from "path";

const fetchWithRetry = require("fetch-retry")(fetch, {
    retries: 4,
    retryDelay: 700
});
const BASE_MAPS_PATH = "./static/maps/";
//DK: Pre-create path if not exists once
const fullPath = path.resolve(BASE_MAPS_PATH);
if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, {recursive: true});

type StaticMapInput = {
    lat: number,
    lng: number,
    fullAddress?: string,
    hasExactAddress?: boolean,
    size?: string,
    pathBounds?: GeoBounds,
    zoomType: ZOOM_TYPE
}

enum ZOOM_TYPE {
    FAR = "FAR",
    CLOSE = "CLOSE",
    STREET = "STREET"
};

const zoomSizes = {
    FAR: 14,
    CLOSE: 18
};

const defaultConfig = {
    format: "jpg",
    maptype: undefined, // "hybrid",
    size: "640x640",
    language: "pl",
    key: api.GOOGLE_MAPS_API_KEY
};


function serializeObjToUrlParams(obj) {
    return Object.entries(obj)
        .map(([key, val]) => (isUndefined(val) ? "" : `${key}=${encodeURIComponent(val.toString())}`))
        .join("&");
}

async function generateThumbnail(imgPath: string, input: StaticMapInput) {
    const img = await Jimp.read(imgPath);
    const thumbPath = BASE_MAPS_PATH + getMapLocFileName(input, {isThumb: true});
    await img.resize(100, 100).quality(70)
        .write(thumbPath);
    return thumbPath;

}

async function downloadFile(url, path) {
    const res = await fetchWithRetry(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
        });
    });
};

function getMapLocFileName({lat, lng, zoomType, pathBounds}: Partial<StaticMapInput>, {isThumb}) {
    let pathBoundsPart = "";
    if (pathBounds) {
        const {northeast: ne, southwest: sw}: GeoBounds = pathBounds;
        pathBoundsPart = ("_p_" + ne.lat + ne.lng + sw.lat + sw.lng);
    }
    return (isThumb ? "thumb_" : "") + lat + lng + pathBoundsPart + `_${zoomType}.jpg`;
}

export {
    StaticMapInput, ZOOM_TYPE, BASE_MAPS_PATH,
    serializeObjToUrlParams, generateThumbnail, downloadFile, getMapLocFileName,
    defaultConfig, zoomSizes
};
