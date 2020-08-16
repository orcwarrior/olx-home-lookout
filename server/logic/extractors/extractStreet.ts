import {deburr} from "lodash";

const DIGIT_RGX = /\d/;

    // const STREET_RGX = /((ulic\w*)|(ul)|(adres)|(zlokalizowa\w+ na))\W{1,2}(((\w+(\.\w+)?\s+){1,3}\d+[a-f,r]?)|(\w+))(\s|[^mzp]|,|r)/gi;
function extractStreet(title, description) {
    const STREET_RGX = /((ulic\w*)|(ul)|(adres)|(zlokalizowa\w+ na))\W{1,2}(((\w+(\.\w+)?(\s|\-)+){1,3}\d+[a-f,r]?)|(\w+(\s|\-)*){1,2})(\s|[^mzp]|,|r)/gi;
    const fullStr = deburr(`${title} ${description}`);
    let streetMatch, groups;
    while (groups = STREET_RGX.exec(fullStr)) {
        const streetGr = groups[6];
        if (
            (!streetMatch && streetGr && streetGr.length > 2)
            || streetMatch && (!DIGIT_RGX.test(streetMatch) && DIGIT_RGX.test(streetGr))
    )
        {
            streetMatch = streetGr;
        }
    }

    return streetMatch;
}

export {extractStreet};
