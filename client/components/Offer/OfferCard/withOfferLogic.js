import React, { useCallback, useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import MUTATE_OFFER from "@gql-queries/actOnOffer.graphql";
import * as Color from "color";
import { getBigImage, getThumbImage } from "@components/Offer/utils";
import { ThemeContext as GrommetThemeContext } from "grommet";
import { Location, Select, StatusUnknown } from "grommet-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const LocalThemeContext = React.createContext({
  global: {
    colors: {
      "brand": "#FEE715",
      "status-ok": "#00C781",
      "status-error": "#FF4040",
      "light-3": "#EDEDED",
      "dark-6": "#999999",
    }
  }
});

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

  // console.log({themeColors, percentageM2PriceDeviation})
  const isPositive = (percentageM2PriceDeviation < 0);
  const absDeviation = Math.abs(percentageM2PriceDeviation)
  const dstColor = isPositive ? positiveColor : negativeColor;
  const fulfillment = Math.max(0, (Math.min(1, absDeviation / METER_MAX)));
  // console.log({fulfillment})
  return Color(midColor).mix(Color(dstColor), fulfillment).hex();

}

function buildColorByValueFn(themeColors) {
  return (val) => {
    if (val === 0) return themeColors["light-3"];
    else return (val > 0) ? themeColors["status-ok"] : themeColors["status-error"];
  }
}

function prepGalleryImages(gallery) {
  return gallery.map(url => ({
    original: getBigImage(url),
    thumbnail: getThumbImage(url)
  }))
}

function renderLocationIcon({city, street, hasExactAddress, isEmail, themeColors}) {
  const gMapsQuery = `https://www.google.pl/maps/search/${encodeURIComponent(`${city}, ${street}`)}`;
  let icon;

  if (isEmail) {
    if (street && hasExactAddress)
      icon = <span color={themeColors.brand}>📍</span>
    else if (street)
      icon = <span color={themeColors["light-3"]}>🗺️</span>
    else icon = <span color={themeColors["dark-6"]}>❓</span>
  } else {

    if (street && hasExactAddress)
      icon = <Location size="22px" color={themeColors.brand}/>
    else if (street)
      icon = <Select size="22px" color={themeColors["light-3"]}/>
    else icon = <StatusUnknown size="22px" color={themeColors["dark-6"]}/>
  }

  return (street) ? <a href={gMapsQuery} target="_blank">{icon}</a> : icon;

}


const withOfferLogic = (Component, {skipGrommet}) => (offer) => {
  const {
    id, createdAt: createdAtStr,
    title, url, district, city, street, hasExactAddress,
    gallery, mainImg, deviation_price_perM2,
    prices_perM2,
    mapFarImg, mapCloseImg, mapStreetImg,
    userReviewStatus,
    rank, indicators_comfort, indicators_deal, descriptionRating
  } = offer;
  const [percentageM2PriceDeviation, meterTxtPriceDeviation] = calcPercDeviation(offer);

  const [_, __, ___, dbId] = JSON.parse(atob(id));
  const [changeOffer] = useMutation(MUTATE_OFFER)

  const [galleryImgs, setGalleryImgs] = useState(prepGalleryImages([...gallery, mapFarImg, mapCloseImg, mapStreetImg].filter(Boolean)));
  const {global: {colors: themeColors}} = useContext(skipGrommet ? LocalThemeContext : GrommetThemeContext);
  const getColorByValue = buildColorByValueFn(themeColors);

  const favoriteColor = (userReviewStatus === "BOOKMARKED") ? "accent-1" : "white";
  const rejectedColor = (userReviewStatus === "REJECTED") ? "dark-3" : "white";
  const locationIcon = renderLocationIcon({city, street, hasExactAddress, isEmail: false, themeColors})
  const locationIconEmail = renderLocationIcon({city, street, hasExactAddress, isEmail: true, themeColors})

  function actOnOffer(action) {

    return () => {
      if (userReviewStatus === action) action = "NONE";
      return changeOffer({variables: {id: dbId, _set: {userReviewStatus: action}}})
    }
  }

  function updateStreet(newStreet) {
    return changeOffer({variables: {id: dbId, _set: {street: newStreet}}})
  }

  const toggleLike = actOnOffer("BOOKMARKED"), toggleReject = actOnOffer("REJECTED")

  const createdAt = Date.parse(createdAtStr);

  const logic = {
    dbId,
    toggleLike, toggleReject, updateStreet,
    favoriteColor, rejectedColor,

    mainImg: mainImg || NO_PHOTO_URL,
    galleryImgs,
    createdAgo: createdAt && `${formatDistanceToNow(createdAt)} ago`,
    meterPriceDevProps: decorateMeter({percentageM2PriceDeviation, themeColors}),
    meterTxtColor: getMeterColor({themeColors, percentageM2PriceDeviation}),
    meterTxtPriceDeviation,
    locationIcon, locationIconEmail, getColorByValue,

    display_priceM2: Math.round(prices_perM2),
    rank: (rank) ? rank.toFixed(2) : "?",
    indicators_comfort: (indicators_comfort) ? indicators_comfort.toFixed(2) : "?",
    indicators_deal: (indicators_deal) ? indicators_deal.toFixed(2) : "?",
    descriptionRating: (descriptionRating) ? descriptionRating.toFixed(2) : "?"

  }
  return <Component {...offer} logic={logic}/>

}

export { withOfferLogic }
