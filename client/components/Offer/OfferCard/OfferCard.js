import React, { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading,
  Paragraph,
  Text,
  Button
} from 'grommet'

import { Clear, Currency, Favorite, Lounge, Task } from 'grommet-icons'
import { CardTopGallery } from "@components/Offer/OfferCard/CardTopGallery";
import { withOfferLogic } from "@components/Offer/OfferCard/withOfferLogic";
import { InlineInput } from "@components/common/InlineInput";
import "./OfferCard.scss"

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

const _OfferCard = React.forwardRef(({measure, style, ...offer}, cellMeasureRef) => {


      const {
        id,
        title, url, district, description, street,

        userReviewStatus
      } = offer;
      const {
        favoriteColor, rejectedColor,
        toggleLike, toggleReject, updateStreet,
        locationIcon,
        indicators_comfort, indicators_deal, descriptionRating, rank
      } = offer.logic;
      const delayMeasure = () => setTimeout(measure, 100);


      return <Box align="center" justify="center" pad="small" background={{"color": "light-1", "opacity": "weak"}}
                  round="medium" ref={cellMeasureRef} className="offer-card" style={style}>

        <CardTopGallery {...offer} onImageLoad={measure}/>

        <Box align="stretch" justify="start" direction="column" fill={true} flex="shrink"
             pad="small">
          <Box align="center" justify="between" direction="row" gap="medium" fill="horizontal">
            <Heading textAlign="start" truncate={false} size="medium" level="3">
              <Anchor href={url} target="_blank" color="white">
                {title}
              </Anchor>
            </Heading>
            <Box align="center" justify="center" direction="row" gap="small" pad="small" className="actions">
              <Button icon={<Favorite color={favoriteColor}/>} type="button" onClick={toggleLike}/>
              <Button icon={<Clear color={rejectedColor}/>} type="button" onClick={toggleReject}/>
            </Box>
          </Box>
          <div className="middle-infos">
            <div className="location">
              {locationIcon}&nbsp;
              {district},&nbsp;<InlineInput value={street} placeholder="(ulica)"
                                            fontSize={13} onSubmit={updateStreet}/>
            </div>
            <Box className="indicators" align="center" justify="center" direction="row" gap="small"
                 pad={{"left": "medium"}}>
              <Box align="center" justify="center" direction="row" style={{wordWrap: "nowrap"}}>
                <Text size="small">☆ {rank}</Text>
              </Box>
              <Box align="center" justify="center" direction="row">
                <Lounge size="small"/>
                <Text size="small">&nbsp;{indicators_comfort}</Text>
              </Box>
              <Box align="center" justify="center" direction="row">
                <Task size="small"/>
                <Text size="small">&nbsp;{descriptionRating}</Text>
              </Box>
              <Box align="center" justify="center" direction="row">
                <Currency size="small"/>
                <Text size="small">&nbsp;{indicators_deal}</Text>
              </Box>
            </Box>
          </div>
          <Box align="stretch" justify="center" gap="xxsmall" flex="grow">
            <Accordion animate={false} fill="vertical" className="description" onActive={delayMeasure}>
              <AccordionPanel label="Opis" panelBorder={0}>
                <Box align="stretch" justify="start" flex={false} direction="row" basis="small" pad="small"
                     alignContent="stretch" flex="grow" overflow={"auto"}>
                  <Paragraph fill="vertical" size="small" flex={{grow: 1.5}} width={"large"} basis="medium">
                    {description}
                  </Paragraph>
                </Box>
              </AccordionPanel>
            </Accordion>
          </Box>
        </Box>
      </Box>;
    }
)
const OfferCard = withOfferLogic(_OfferCard, {skipGrommet: false})

export { OfferCard }
