import {Router} from "express";
import * as Jimp from "jimp";
import {api} from "@config/index";
import {GeoBounds, getAddrGeocode} from "/api/geo/queryAddressGeo";
import {isUndefined} from "lodash";
import {Offer} from "@db/schemas";
import knexClient from "/knexClient";
import fetch from "node-fetch";
import * as fs from "fs";

const router = Router();


type StaticMapInput = {
    lat: number,
    lng: number,
    size?: string,
    pathBounds?: GeoBounds,
    zoomType: ZOOM_TYPE
}

enum ZOOM_TYPE {
    FAR = "FAR",
    CLOSE = "CLOSE"
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

const BASE_MAPS_PATH = "./static/maps/";

async function generateStaticMapImg(input: StaticMapInput): Promise<[string, string]> {
    const {lat, lng, size, pathBounds, zoomType} = input;
    const params = {
        ...defaultConfig,
        center: `${lat},${lng}`,
        zoom: zoomSizes[zoomType],
        markers: (!pathBounds ? `size:mid|color:#2dc2a3|label:Home|${lat},${lng}` : undefined),
        ...((zoomType === ZOOM_TYPE.CLOSE) ? {
            maptype: "hybrid"
        } : {
            path: _toGApiPath(pathBounds)
        })
    };
    console.log(`params: `, params);

    const url = `https://maps.googleapis.com/maps/api/staticmap?${_serializeObjToUrlParams(params)}`;
    console.log(`url: `, url);
    const filePath = BASE_MAPS_PATH + getMapLocFileName(input, {isThumb: false});
    return _downloadFile(url, filePath)
        .then(async (): Promise<[string, string]> => {
            const bigImg = await Jimp.read(filePath);
            const thumbPath = BASE_MAPS_PATH + getMapLocFileName(input, {isThumb: true});
            await bigImg.resize(100, 100).quality(70)
                .write(thumbPath);
            return [filePath, thumbPath];
        });


    function _serializeObjToUrlParams(obj) {
        return Object.entries(obj)
            .map(([key, val]) => (isUndefined(val) ? "" : `${key}=${encodeURIComponent(val.toString())}`))
            .join("&");
    }

    function _toGApiPath({northeast, southwest}: GeoBounds) {
        return `color:0xffaa00|weight:3|${northeast.lat},${northeast.lng}|${southwest.lat},${southwest.lng}`;
    }

    async function _downloadFile(url, path) {
        const res = await fetch(url);
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

}

function getMapLocFileName({lat, lng, zoomType, pathBounds}: Partial<StaticMapInput>, {isThumb}) {
    const {northeast: ne, southwest: sw} = pathBounds;
    const pathBoundsPart = (pathBounds) ? ("p_" + ne.lat + ne.lng + sw.lat + sw.lng) : "";
    return (isThumb ? "thumb_" : "") + lat + lng + pathBoundsPart + `_${zoomType}.jpg`;
}

async function getMapImg(input: StaticMapInput) {
    const imgPath = getMapLocFileName(input, {isThumb: false});
    const imgThumbPath = getMapLocFileName(input, {isThumb: true});
    const hasImg = await _fExist(imgPath);

    if (hasImg)
        return {img: imgPath, thumb: imgThumbPath};
    else {
        const [img, thumb] = await generateStaticMapImg(input);
        return {img, thumb};
    }

    async function _fExist(path) {
        return fs.promises.access(path, fs.constants.R_OK).then(() => true).catch(() => false);
    };
}

async function routeMapImagesHandler(req, res) {

    const {offerId} = req.params;
    const offer: Offer = await knexClient<Offer>("Offers")
        .where({id: Number(offerId)})
        .first();

    const [_, __, geoPoint, geoBounds] = await getAddrGeocode(`${offer.district} ${offer.street || ""}`);

    const farInput = {
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
        zoomType: ZOOM_TYPE.FAR,
        pathBounds: geoBounds
    };
    res.json({
        far: await getMapImg(farInput),
        close: await getMapImg({...farInput, zoomType: ZOOM_TYPE.CLOSE})
    });
}

const fakeRes = {json: console.log};
// routeMapImagesHandler({params: {offerId: 946}}, fakeRes);
// routeMapImagesHandler({params: {offerId: 973}}, fakeRes);

router.get("/map-images/:offerId", routeMapImagesHandler);


export default router;
