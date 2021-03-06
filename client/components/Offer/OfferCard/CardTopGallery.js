import { Box, Image, Meter, ResponsiveContext, Stack, Text } from "grommet";
import React, { useContext, useState } from "react";
import { Home } from 'grommet-icons'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./CardTopGallery.style.scss";
import { useDoubleTap } from "use-double-tap";
import { InlineInput } from "@components/common/InlineInput";

const STYLE_TXT_SHADOW = {textShadow: "2px 2px 6px rgba(0,0,0,0.3)"}
const STYLE_TXT_SHADOW_STRONG = {textShadow: "1px 1px 3px rgba(0,0,0,0.6)"}

const STYLE_NOPOINTER = {
  pointerEvents: "none"
}
const STYLE_BACKDROP = {
  ...STYLE_NOPOINTER,
  background: "linear-gradient(180deg, rgba(0,0,0,0.33) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.33) 100%)"
}


const NO_PHOTO_URL = "/assets/no-photo.png"
const CardTopGallery = ({onImageLoad,...offer}) => {
  const {
    createdAt: createdAtStr,
    mainImg: _mainImg, gallery,
    attrs_rooms, attrs_area, deviationAvgM2Price,
    prices_full, prices_perM2,
  } = offer;
  const {
    createdAgo, galleryImgs,
    meterPriceDevProps, meterTxtColor, meterTxtPriceDeviation,
    display_priceM2, updateFullPrice
  } = offer.logic;

  const size = useContext(ResponsiveContext);
  const isMobile = (size === "small");
  const topTextSize = isMobile ? "xsmall" : "small"
  const btmProps = {
    meter: (isMobile)
        ? {size: "xxsmall", thickness: "xsmall"}
        : {size: "xsmall", thickness: "small"},
    percent: (isMobile)
    ? {size: "small"}
    : {size: "large"}
  }

  function _toggleGalleryClass(curClass) {
    switch (curClass) {
      case "fit-cover": return "fit-ani";
      case "fit-ani": return "fit-contain";
      case "fit-contain": return "fit-cover";

    }
  }
  const [galleryClass, setGaleryClass] = useState("fit-cover")
  const enableEvts = {
    onDoubleClick: () => setGaleryClass(_toggleGalleryClass),
    ...useDoubleTap(() => setGaleryClass(_toggleGalleryClass))}

  return <Stack fill={true} interactiveChild="first">
    <Box align="center" justify="start" direction="column" fill={true} round="medium" overflow="hidden"
         hoverIndicator={false}
         elevation="none">
      {/**/}
      <ImageGallery items={galleryImgs} lazyLoad={true} thumbnailPosition="right" onImageLoad={onImageLoad}
                    showPlayButton={false} showNav={false} additionalClass={galleryClass} {...enableEvts} />
    </Box>
    <Box fill={true} round="medium" style={STYLE_BACKDROP}/>
    <Box align="start" justify="start" pad="medium" direction="row" fill="vertical" style={STYLE_NOPOINTER}>
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}
           border={{"side": "right", "color": "active"}}>
        <Text size={topTextSize} style={STYLE_TXT_SHADOW_STRONG}>
          {attrs_rooms} pokoje
        </Text>
      </Box>
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}
           border={{"side": "right", "color": "active"}}>
        <Home size={topTextSize}/>
        <Text size={topTextSize} weight="bold" style={STYLE_TXT_SHADOW_STRONG}>
          {attrs_area}m²
        </Text>
      </Box>
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}>
        <Text size={topTextSize} textAlign="start" style={STYLE_TXT_SHADOW_STRONG}>
          {createdAgo}
        </Text>
      </Box>
    </Box>
    <Box align="end" justify="start" fill="vertical" direction="row" flex="shrink"
         animation={{"type": "fadeIn", "size": "medium"}} style={STYLE_NOPOINTER}>
      <Box align="center" justify="start" direction="row" gap="xxsmall" pad="xsmall">
        <Box align="end" justify="start" gap="xsmall" direction="column" fill={false}
             margin={{"right": "medium", "left": "small"}}>
          <Text size="xxlarge" textAlign="end" weight="bold"
                color="brand" style={STYLE_TXT_SHADOW}>
            <InlineInput fontSize={34} value={prices_full} onSubmit={updateFullPrice} />{}zł


          </Text>
          <Text textAlign="end" size="large" color="white" style={STYLE_TXT_SHADOW}>
            {display_priceM2}zł/m²
          </Text>
        </Box>
        <Box align="center" justify="center" flex="shrink">
          <Stack fill={false} anchor="center">
            <Box align="stretch" justify="center" pad="xsmall" fill direction="column" gap="xsmall">
              <Meter type="circle" background="active" round
                     {...btmProps.meter}  {...meterPriceDevProps}/>
            </Box>
            <Box align="center" justify="center" direction="column" gap="medium" margin={{"bottom": "xsmall"}}>
              <Text textAlign="center" {...btmProps.percent}weight="bold" style={STYLE_TXT_SHADOW}
                    color={meterTxtColor}>
                {meterTxtPriceDeviation}%
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box align="center" justify="center" direction="column" gap="small" elevation="none"/>
      </Box>
    </Box>
  </Stack>
}

export { CardTopGallery }
