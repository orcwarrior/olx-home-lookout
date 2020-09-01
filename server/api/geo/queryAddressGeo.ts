import {Router} from "express";
import * as LRU from "lru-cache";
import * as ms from "ms";
import {deburr} from "lodash";
import fetch from "node-fetch";
import {api} from "@config/index";
import {Geography} from "@db/schemas/utils";

const fetchWithRetry = require("fetch-retry")(fetch, {
    retries: 4,
    retryDelay: 700
});

const lruCache = new LRU({max: 1000, maxAge: ms("1y")});
const router = Router();

type GeoBounds = {
    northeast: {
        lat?: number,
        lng?: number,
    },
    southwest: {
        lat?: number,
        lng?: number,
    }
}

async function getAddrGeocode(_address): Promise<[string, string, Geography, GeoBounds]> {
    const address = deburr(_address.trim());

    if (lruCache.has(address))
        return lruCache.get(address);

    return fetchWithRetry(_getUri(address))
        .then(res => res.json())
        .then((response) => {
            const {status, results} = response;
            if (status !== "OK") {
                const errMsg = "Google StreetAPI err: " + JSON.stringify(response);
                console.error(errMsg);
                return [null, null, null, null];
            }
            ;

            let geoBounds = _findAddrBounds(results);
            if (geoBounds) {
                const bndsSize = _boundsSizeKm(geoBounds);
                if (bndsSize < 0.15) {// less than 150m -> "convert" to point
                    console.log(`Query "${address}" bounds removed as they size was ${bndsSize * 1000}m`);
                    geoBounds = undefined;
                } else
                    console.log(`Query "${address}" returned geo-bounds of ${bndsSize.toFixed(2)}km size, meaning it's not exact address`); //, res: ${JSON.stringify(response, null, 1)}`);
            }

            const res: [string, string, Geography, GeoBounds] = [
                _findStreetName(results),
                _findFullAddr(results),
                _findAddrGeo(results),
                geoBounds,
            ];
            lruCache.set(res);
            return res;
        });

    function _getUri(address) {
        const key = api.GOOGLE_MAPS_API_KEY;
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
    }

    function _findStreetName([result]): string {
        const addrComponents = result?.address_components?.find(c => c.types.includes("route"));
        return addrComponents?.short_name;
    }

    function _findFullAddr([result]): string {
        return result.formatted_address;
    }

    function _findAddrGeo([result]) {
        const geo = result?.geometry?.location;
        return new Geography(geo.lng, geo.lat);
    }

    function _findAddrBounds([result]): GeoBounds {
        const {bounds} = result?.geometry;
        return bounds;
    }

    function _boundsSizeKm(bounds: GeoBounds) {
        const {
            northeast: {lat: lat1, lng: lon1},
            southwest: {lat: lat2, lng: lon2}
        } = bounds;
        const p = 0.017453292519943295;    // Math.PI / 180
        const cos = Math.cos;
        const a = 0.5 - cos((lat2 - lat1) * p) / 2 +
            cos(lat1 * p) * cos(lat2 * p) *
            (1 - cos((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
}

router.get("/geo-query", async (req, res) => {
    const {q}: { q?: string } = req.query;
    const addressLookup = q.trim();


    const [street, fullAddress, location, bounds] = await getAddrGeocode(addressLookup);
    res.json({street, fullAddress, location, bounds});

});
export {getAddrGeocode, GeoBounds};

export default router;
