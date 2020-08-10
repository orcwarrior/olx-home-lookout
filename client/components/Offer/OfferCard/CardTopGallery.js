import { Box, Image, Meter, Stack, Text, ThemeContext } from "grommet";
import { getBigImage } from "@components/Offer/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useContext } from "react";
import * as Color from "color";
import { Home } from 'grommet-icons'


function calcPercDeviation({prices_perM2, deviationAvgM2Price}) {
  const avgPrice = prices_perM2 - (deviationAvgM2Price);
  // console.log(`avgPrice: `, avgPrice);
  const deviation = (deviationAvgM2Price * 100 / avgPrice).toFixed(0);
  const deviationTxt = (deviation > 0) ? `+${deviation}` : `-${-1 * (deviation)}`;
  return [deviation, deviationTxt];
}

const METER_MAX = 25;
const STYLE_TXT_SHADOW = {textShadow: "2px 2px 6px rgba(0,0,0,0.3)"}
const STYLE_TXT_SHADOW_STRONG = {textShadow: "1px 1px 3px rgba(0,0,0,0.6)"}
const STYLE_MIRRORED_METER = {
  transform: "scaleX(-1)"
}
const STYLE_BACKDROP = {
  background: "linear-gradient(180deg, rgba(0,0,0,0.33) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.33) 100%);"
}

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


const CardTopGallery = (offer) => {
  const {
    createdAt: createdAtStr,
    mainImg: _mainImg,
    attrs_rooms, attrs_area, deviationAvgM2Price,
    prices_full, prices_perM2
  } = offer;

  const {global: {colors: themeColors}} = useContext(ThemeContext);

  const mainImg = _mainImg || "/assets/no-photo.png"
  const createdAt = Date.parse(createdAtStr);
  const [percentageM2PriceDeviation, percentageM2PriceDeviationTxt] = calcPercDeviation(offer);

  return <Stack fill={true}>
    <Box align="center" justify="start" direction="column" fill={true} round="medium" overflow="hidden"
         hoverIndicator={false}
         elevation="none">
      <Image src={getBigImage(mainImg)} fit="cover" fill/>
    </Box>
    <Box fill={true} round="medium" style={STYLE_BACKDROP} />
    <Box align="start" justify="start" pad="medium" direction="row" fill="vertical">
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}
           border={{"side": "right", "color": "active"}}>
        <Text size="small" style={STYLE_TXT_SHADOW_STRONG}>
          {attrs_rooms} pokoje
        </Text>
      </Box>
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}
           border={{"side": "right", "color": "active"}}>
        <Home size="small"/>
        <Text size="small" weight="bold" style={STYLE_TXT_SHADOW_STRONG}>
          {attrs_area}m²
        </Text>
      </Box>
      <Box align="center" justify="center" direction="row" gap="xsmall" pad={{"horizontal": "small"}}>
        <Text size="small" textAlign="start" style={STYLE_TXT_SHADOW_STRONG}>
          {createdAt && `${formatDistanceToNow(createdAt)} ago`}
        </Text>
      </Box>
    </Box>
    <Box align="end" justify="start" fill="vertical" direction="row" flex="shrink"
         animation={{"type": "fadeIn", "size": "medium"}}>
      <Box align="center" justify="start" direction="row" gap="xxsmall" pad="xsmall">
        <Box align="end" justify="start" gap="xsmall" direction="column" fill={false}
             margin={{"right": "medium", "left": "small"}}>
          <Text size="xxlarge" textAlign="end" weight="bold"
                color="brand" style={STYLE_TXT_SHADOW}>
            {prices_full}zł


          </Text>
          <Text textAlign="end" size="large" color="white" style={STYLE_TXT_SHADOW}>
            {Math.round(prices_perM2)}zł/m²
          </Text>
        </Box>
        <Box align="center" justify="center" flex="shrink">
          <Stack fill={false} anchor="center">
            <Box align="stretch" justify="center" pad="xsmall" fill direction="column" gap="xsmall">
              <Meter type="circle" background="active" round
                     size="xsmall" thickness="small" {...decorateMeter({
                percentageM2PriceDeviation,
                themeColors
              })}/>
            </Box>
            <Box align="center" justify="center" direction="column" gap="medium" margin={{"bottom": "xsmall"}}>
              <Text textAlign="center" size="large" weight="bold" style={STYLE_TXT_SHADOW}
                    color={getMeterColor({themeColors, percentageM2PriceDeviation})}>
                {percentageM2PriceDeviationTxt}%
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
