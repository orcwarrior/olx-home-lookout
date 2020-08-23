import React, { useCallback } from "react";
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

const _OfferCard = (offer) => {


  const {
    id,
    title, url, district, description, street, rank, _rank,
    indicators_comfort, indicators_deal, descriptionRating,
    userReviewStatus
  } = offer;
  const {
    favoriteColor, rejectedColor,
    toggleLike, toggleReject, updateStreet,
    locationIcon,
  } = offer.logic;


  return <Box align="center" justify="center" pad="small" background={{"color": "light-1", "opacity": "weak"}}
              round="medium">

    <CardTopGallery {...offer} />

    <Box align="stretch" justify="start" direction="column" fill={true} flex="shrink"
         pad="small">
      <Box align="center" justify="between" direction="row" gap="medium" fill="horizontal">
        <Heading textAlign="start" truncate={false} size="medium" level="3">
          <Anchor href={url} target="_blank" color="white">
            {title}
          </Anchor>
        </Heading>
        <Box align="center" justify="center" direction="row" gap="medium" pad="small">
          <Button icon={<Favorite color={favoriteColor}/>} type="button" onClick={toggleLike}/>
          <Button icon={<Clear color={rejectedColor}/>} type="button" onClick={toggleReject}/>
        </Box>
      </Box>
{/*      <Box align="center" justify="between" direction="row" pad="small" gap="xsmall" flex="grow" className="middle-infos" >
        <Box color="light-5" textAlign="center" size="small" fill="horizontal" style={{whiteSpace: "nowrap"}} flex="shrink" >
          {locationIcon}&nbsp;
          {district}, <InlineInput value={street} onSubmit={updateStreet} />
        </Box>
        <Box align="center" justify="end" direction="row" flex="grow">
          <Box align="center" justify="center" direction="row" gap="small"
               border={{"color": "dark-6", "side": "left"}} pad={{"left": "medium"}}>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Text size="small">☆ {rank.toFixed()}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Lounge size="small"/>
              <Text size="small">{indicators_comfort.toFixed(2)}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Task size="small"/>
              <Text size="small">{descriptionRating.toFixed(2)}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Currency size="small"/>
              <Text size="small">{indicators_deal.toFixed(2)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>*/}
      <div className="middle-infos">
        <div className="location">
          {locationIcon}&nbsp;
          {district},&nbsp;<InlineInput value={street} onSubmit={updateStreet} />
        </div>
        <div className="indicators">
          <Box align="center" justify="center" direction="row" gap="small"
               border={{"color": "dark-6", "side": "left"}} pad={{"left": "medium"}}>
            <Box align="center" justify="center" direction="row" gap="xsmall" style={{wordWrap:"nowrap"}}>
              <Text size="small">☆ {rank.toFixed()}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Lounge size="small"/>
              <Text size="small">{indicators_comfort.toFixed(2)}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Task size="small"/>
              <Text size="small">{descriptionRating.toFixed(2)}</Text>
            </Box>
            <Box align="center" justify="center" direction="row" gap="xsmall">
              <Currency size="small"/>
              <Text size="small">{indicators_deal.toFixed(2)}</Text>
            </Box>
          </Box>
        </div>
      </div>
      <Box align="stretch" justify="center" gap="xxsmall" flex="grow">
        <Accordion animate={false} fill="vertical">
          <AccordionPanel label="Opis">
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

const OfferCard = withOfferLogic(_OfferCard, {skipGrommet: false})

export { OfferCard }
