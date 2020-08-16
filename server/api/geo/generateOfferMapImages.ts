import {Router} from "express";
import {GeoBounds, getAddrGeocode} from "/api/geo/queryAddressGeo";
import {Offer} from "@db/schemas";
import knexClient from "/knexClient";
import * as fs from "fs";
import * as utils from "./generateOfferMapImages.utils";
import {StaticMapInput, ZOOM_TYPE, BASE_MAPS_PATH} from "./generateOfferMapImages.utils";

const router = Router();


async function generateStaticMapImg(input: StaticMapInput): Promise<[string, string]> {
    const {lat, lng, size, pathBounds, zoomType} = input;
    const params = {
        ...utils.defaultConfig,
        center: `${lat},${lng}`,
        zoom: utils.zoomSizes[zoomType],
        markers: (!pathBounds ? `size:mid|color:#2dc2a3|label:Home|${lat},${lng}` : undefined),
        ...((zoomType === ZOOM_TYPE.CLOSE) ? {
            maptype: "hybrid"
        } : {
            path: pathBounds && _toGApiPath(pathBounds)
        })
    };

    const url = `https://maps.googleapis.com/maps/api/staticmap?${utils.serializeObjToUrlParams(params)}`;

    const filePath = BASE_MAPS_PATH + utils.getMapLocFileName(input, {isThumb: false});
    return utils.downloadFile(url, filePath)
        .then(async (): Promise<[string, string]> => {
            return [filePath, await utils.generateThumbnail(filePath, input)];
        });

    function _toGApiPath({northeast, southwest}: GeoBounds) {
        return `color:0xff2200|weight:3|${northeast.lat},${northeast.lng}|${southwest.lat},${southwest.lng}`;
    }
}

async function generateStreetViewImg(input: StaticMapInput): Promise<[string, string]> {
    const {fullAddress} = input;
    console.log(`Generate street view for: ${fullAddress}`);

    const params = {
        size: utils.defaultConfig.size,
        key: utils.defaultConfig.key,
        fov: 110,
        location: fullAddress
    };

    const url = `https://maps.googleapis.com/maps/api/streetview?${utils.serializeObjToUrlParams(params)}`;
    console.log(`url: `, url);
    const filePath = BASE_MAPS_PATH + utils.getMapLocFileName(input, {isThumb: false});

    return utils.downloadFile(url, filePath)
        .then(async (): Promise<[string, string]> => {
            return [filePath, await utils.generateThumbnail(filePath, input)];
        });


}


async function getMapImg(input: StaticMapInput) {

    const imgPath = BASE_MAPS_PATH + utils.getMapLocFileName(input, {isThumb: false});
    const imgThumbPath = BASE_MAPS_PATH + utils.getMapLocFileName(input, {isThumb: true});
    const hasImg = await _fExist(imgPath);

    if (hasImg) {
        console.log(`Image: ${imgPath} already exists!`);
        return {img: imgPath, thumb: imgThumbPath};
    } else {
        console.log(`Image: ${imgPath} has to be generated...`, process.cwd());
        const [img, thumb] = (input.zoomType === ZOOM_TYPE.STREET)
            ? await generateStreetViewImg(input)
            : await generateStaticMapImg(input);
        return {img, thumb};
    }

    async function _fExist(path) {
        return fs.promises.access(path, fs.constants.R_OK).then(() => true).catch(() => false);
    };
}

type OfferMapImages = {
    far: { img: string, thumb: string },
    close: { img: string, thumb: string },
    street?: { img: string, thumb: string },
}

async function getMapImagesForOffer(offer: Partial<Offer>): Promise<OfferMapImages> {

    const [_, fullAddress, geoPoint, geoBounds] = await getAddrGeocode(`${offer.district} ${offer.street || ""}`);

    const farInput: StaticMapInput = {
        fullAddress,
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
        zoomType: ZOOM_TYPE.FAR,
        pathBounds: geoBounds
    };
    const hasExactAddress = !geoBounds;

    return {
        far: await getMapImg(farInput),
        close: await getMapImg({...farInput, zoomType: ZOOM_TYPE.CLOSE}),
        ...(hasExactAddress ? {street: await getMapImg({...farInput, zoomType: ZOOM_TYPE.STREET})} : {})
    };
}


router.get("/map-images/:offerId", async (req, res) => {
    const {offerId} = req.params;
    const offer: Offer = await knexClient<Offer>("Offers")
        .where({id: Number(offerId)})
        .first();

    res.json(await getMapImagesForOffer(offer));
});

export {getMapImagesForOffer};
export default router;
