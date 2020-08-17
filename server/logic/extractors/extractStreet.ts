import {deburr} from "lodash";

const DIGIT_RGX = /\d/;

    // const STREET_RGX = /((ulic\w*)|(ul)|(adres)|(zlokalizowa\w+ na))\W{1,2}(((\w+(\.\w+)?\s+){1,3}\d+[a-f,r]?)|(\w+))(\s|[^mzp]|,|r)/gi;
    // const STREET_RGX = /((ulic\w*)|(ul)|(adres)|(zlokalizowa\w+ na)|(okolice))\W{1,2}(((([\.\w]+)?(\s|\.|\-)+){1,3}[\d/]+[a-f,r]?)|(\w+[\.\- ]*){1,3})(\s|[^mzp]|,|\.|r)/gi;
function extractStreet(title, description) {
    const STREET_RGX = /((ulic\w*)|(przy (ul)?)|(ul)|(adres)|(zlokalizowa\w+ na (ul))|(okolice))[\.\W]{1,2}(((((\w{1,2}\.)?\w+)?(\s|\.|\-)+){1,3}[\d/]+[a-f,r]?)|(((\w\.)|(\w+))[\- ]{0,3}){1,3})(\s|[^mzp]|,|\.|r)/gi;
    const fullStr = deburr(`${title} ${description}`);
    let streetMatch, groups;
    while (groups = STREET_RGX.exec(fullStr)) {
        const streetGr = groups[7];
        if (
            (!streetMatch && streetGr && streetGr.length > 2)
            || streetMatch && (!DIGIT_RGX.test(streetMatch) && DIGIT_RGX.test(streetGr))
    )
        {
            streetMatch = streetGr.replace(/-(\w)/, "- $1");
        }
    }

    return streetMatch;
}

export {extractStreet};
