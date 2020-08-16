import React, { useCallback, useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import MUTATE_OFFER from "@gql-queries/actOnOffer.graphql";
import * as Color from "color";
import { getBigImage, getThumbImage } from "@components/Offer/utils";
import { ThemeContext } from "grommet";
import formatDistanceToNow from "date-fns/formatDistanceToNow";


global.Buffer = global.Buffer || require('buffer').Buffer;
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}


const NO_PHOTO_URL = "/assets/no-photo.png"

function decorateMeter({percentageM2PriceDeviation, themeColors}) {

  const isPositive = (percentageM2PriceDeviation < 0);
  const absVal = Math.abs(percentageM2PriceDeviation);
  // console.log(`${absVal} / ${METER_MAX}` )
  return {
    max: METER_MAX,
    style: (!isPositive ? STYLE_MIRRORED_METER : {}),
    values: [{
      color: getMeterColor({themeColors, percentageM2PriceDeviation}),
      highlight: true,
      value: Math.min(METER_MAX, absVal),
      label: "deal"
    }]

  }
}

const METER_MAX = 25;
const STYLE_MIRRORED_METER = {transform: "scaleX(-1)"}

function calcPercDeviation({prices_perM2, deviationAvgM2Price}) {
  const avgPrice = prices_perM2 - (deviationAvgM2Price);
  // console.log(`avgPrice: `, avgPrice);
  const deviation = (deviationAvgM2Price * 100 / avgPrice).toFixed(0);
  const deviationTxt = (deviation > 0) ? `+${deviation}` : `-${-1 * (deviation)}`;
  return [deviation, deviationTxt];
}

function getMeterColor({themeColors, percentageM2PriceDeviation}) {
  const positiveColor = themeColors["status-ok"],
      negativeColor = themeColors["status-error"],
      midColor = themeColors["light-3"];

  const isPositive = (percentageM2PriceDeviation < 0);
  const absDeviation = Math.abs(percentageM2PriceDeviation)
  const dstColor = isPositive ? positiveColor : negativeColor;
  const fulfillment = Math.max(0, (Math.min(1, absDeviation / METER_MAX)));
  // console.log({fulfillment})
  return Color(midColor).mix(Color(dstColor), fulfillment).hex();

}

function prepGalleryImages(gallery) {
  return gallery.map(url => ({
    original: getBigImage(url),
    thumbnail: getThumbImage(url)
  }))
}


const withOfferLogic = (Component) => (offer) => {
  const {
    id, createdAt: createdAtStr,
    title, url, district, city, description,
    gallery, mainImg, percentageM2PriceDeviation,
    indicators_comfort, indicators_deal, descriptionRating,
    prices_perM2,
    userReviewStatus
  } = offer;

  const [_, __, ___, dbId] = JSON.parse(atob(id));
  const [changeOffer] = useMutation(MUTATE_OFFER)

  const [galleryImgs, setGalleryImgs] = useState(prepGalleryImages(gallery));
  const {global: {colors: themeColors}} = useContext(ThemeContext);

  const favoriteColor = (userReviewStatus === "BOOKMARKED") ? "accent-1" : "white";
  const rejectedColor = (userReviewStatus === "REJECTED") ? "dark-3" : "white";

  function actOnOffer(action) {

    return () => {
      if (userReviewStatus === action) action = "NONE";
      return changeOffer({variables: {id: dbId, userReviewStatus: action}})
    }
  }

  const toggleLike = actOnOffer("BOOKMARKED"), toggleReject = actOnOffer("REJECTED")

  const createdAt = Date.parse(createdAtStr);

  const logic = {
    toggleLike, toggleReject,
    favoriteColor, rejectedColor,

    mainImg: mainImg || NO_PHOTO_URL,
    galleryImgs,
    createdAgo: createdAt && `${formatDistanceToNow(createdAt)} ago`,
    meterPriceDevProps: decorateMeter({percentageM2PriceDeviation, themeColors}),
    meterTxtColor: getMeterColor({themeColors, percentageM2PriceDeviation}),
    meterTxtPriceDeviation: calcPercDeviation(offer)[1],

    display_priceM2: Math.round(prices_perM2),

  }
  return <Component {...offer} logic={logic}/>

}

export { withOfferLogic }
