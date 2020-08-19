import React, { useState, useEffect } from "react";
import { Box, DropButton, Image, RangeSelector, Text } from "grommet";
import MultiToggle from "react-multi-toggle";
import { Ascend, Descend, Achievement } from "grommet-icons";
import { debounce } from "@utils/debounce";
import "./ReportHeader.scss";

const PRICE_RANGE = [0, 3000];
const AREA_RANGE = [10, 120];
const COMFORT_RANGE = [0, 120];
const USER_REVIEW_FILTER = [
  {
    displayName: "Non-rejected",
    value: {_neq: "REJECTED"}
  },
  {
    displayName: 'Favorited',
    value: {_eq: "BOOKMARKED"}
  },
  {
    displayName: 'All',
    value: {_neq: "EMPTY"}
  },
];

const whereDefaults = {userReviewStatus: {_neq: "REJECTED"}}
const queryDefaults = {where: whereDefaults, orderBy: {deviationAvgM2Price: "asc"}};

function updateOfferWhereAndOrder({pricesRange, areaRange, comfortRange, userReviewStatus, orderBy}) {
  console.log("updateOfferWhereAndOrder...")
  return {
    where: {
      userReviewStatus,
      prices_full: _buildUpRangeFilter(pricesRange, PRICE_RANGE),
      attrs_area: _buildUpRangeFilter(areaRange, AREA_RANGE),
      indicators_comfort: _buildUpRangeFilter(comfortRange, COMFORT_RANGE),
    },
    orderBy: orderBy
  }

  function _buildUpRangeFilter(range, defaults) {
    return {
      ...(range[0] !== defaults[0] ? {_gte: range[0]} : {}),
      ...(range[1] !== defaults[1] ? {_lte: range[1]} : {}),
    }
  }
}

const ReportHeader = ({refetchOffers}) => {

  const [pricesRange, setPricesRange] = useState(PRICE_RANGE)
  const [areaRange, setAreaRange] = useState(AREA_RANGE)
  const [comfortRange, setComfortRange] = useState(AREA_RANGE)
  const [userReviewStatus, setUserReviewStatus] = useState(whereDefaults.userReviewStatus)
  const [orderBy, setOrderBy] = useState({deviationAvgM2Price: "asc"})
  const [queryVarsJSON, setQueryVarsJSON] = useState(JSON.stringify(queryDefaults))

  const refetchDebounced = React.useCallback(debounce(refetchOffers, 1500), [])

  useEffect(() => {
    const updatedVariables = updateOfferWhereAndOrder({pricesRange, areaRange, comfortRange, userReviewStatus, orderBy})
    if (JSON.stringify(updatedVariables) !== queryVarsJSON) {
      console.log(`updatedVariables: `, updatedVariables);
      refetchDebounced(updatedVariables)
    }
  }, [pricesRange, areaRange, comfortRange, userReviewStatus, orderBy])


  return (
      <Box align="center" justify="center" fill="horizontal" direction="row-responsive" basis="xsmall" flex="grow"
           pad={{"horizontal": "large"}}>
        <Box align="center" justify="center" flex="shrink" fill="vertical">
          <Image src="http://localhost:3000/assets/home-lookout-logo.PNG" fit="contain" fill="vertical"/>
        </Box>

        <Box align="stretch" justify="center" flex="grow" direction="row-responsive" gap="medium">
          <Box align="center" justify="between" gap="small" pad="medium" basis="1/4">
            <Box justify="center" align="center" direction="row" gap="small">
              <Text>cena</Text> <Text size="small">{pricesRange[0]} - {pricesRange[1]}PLN</Text>
            </Box>
            <RangeSelector
                direction="horizontal"
                invert={false}
                min={PRICE_RANGE[0]}
                max={PRICE_RANGE[1]}
                size="small"
                round="small"
                values={pricesRange}
                onChange={setPricesRange}
            />
          </Box>
          <Box align="center" justify="between" gap="small" pad="medium" basis="1/4">
            <Box justify="center" align="center" direction="row" gap="small">
              <Text>powierzchnia</Text> <Text size="small">{areaRange[0]} - {areaRange[1]}m²</Text>
            </Box>
            <RangeSelector
                direction="horizontal"
                invert={false}
                min={AREA_RANGE[0]}
                max={AREA_RANGE[1]}
                size="small"
                round="small"
                values={areaRange}
                onChange={setAreaRange}
            />
          </Box>
          <Box align="center" justify="between" gap="small" pad="medium" basis="1/4">
            <Box justify="center" align="center" direction="row" gap="small">
              <Text>komfort</Text> <Text size="small">{comfortRange[0]} - {comfortRange[1]}</Text>
            </Box>
            <RangeSelector
                direction="horizontal"
                invert={false}
                min={COMFORT_RANGE[0]}
                max={COMFORT_RANGE[1]}
                size="small"
                round="small"
                values={comfortRange}
                onChange={setComfortRange}
            />
          </Box>
          <Box align="center" justify="between" gap="small" pad="medium" basis="1/4">
            <MultiToggle
                options={USER_REVIEW_FILTER}
                selectedOption={userReviewStatus}
                onSelectOption={setUserReviewStatus}
                label="Show offers"
            />
          </Box>
        </Box>

        <Box align="center" justify="center" direction="column">
          <DropButton label="Sortowanie" dropAlign={{"top": "bottom"}} dropContent={(
              <Box align="center" justify="center" pad="medium" name="dropContent" background={"black"}
                   animation="fadeIn" hoverIndicator={false} border={{"size": "small"}} gap="small">
                <Box align="center" justify="center" direction="row" gap="xsmall"
                     onClick={() => setOrderBy({prices_full: "desc"})}>
                  <Text color="accent-4" onClick={() => setOrderBy({rank: "desc"})}>
                    Ocena
                  </Text>
                  <Achievement color="accent-4" size="medium"/>
                </Box>
                <Text color="accent-4" onClick={() => setOrderBy({rank: "desc"})}>
                  Ocena oferty
                </Text>
                <Text color="accent-4" onClick={() => setOrderBy({indicators_deal: "desc"})}>
                  Okazja cenowa
                </Text>
                <Text color="accent-4" onClick={() => setOrderBy({indicators_comfort: "desc"})}>
                  Komfort
                </Text>
                <Text color="accent-4" onClick={() => setOrderBy({deviationAvgM2Price: "asc"})}>
                  Odchyl. cenowe
                </Text>
                <Text color="accent-4" onClick={() => setOrderBy({prices_perM2: "asc"})}>
                  Cena m²
                </Text>
                <Box align="center" justify="center" direction="row" gap="xsmall"
                     onClick={() => setOrderBy({prices_full: "asc"})}>
                  <Text color="accent-4">
                    Cena {/* rosnaco */}
                  </Text>
                  <Ascend color="accent-4" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall"
                     onClick={() => setOrderBy({prices_full: "desc"})}>
                  <Text color="accent-4">
                    Cena {/* malejaco */}
                  </Text>
                  <Descend color="accent-4" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall"
                     onClick={() => setOrderBy({attrs_area: "asc"})}>
                  <Text color="accent-4">Powierzchnia {/* rosnaco */}</Text>
                  <Ascend color="accent-4" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall"
                     onClick={() => setOrderBy({attrs_area: "desc"})}>
                  <Text color="accent-4">Powierzchnia {/* malejaco */}</Text>
                  <Descend color="accent-4" size="medium"/>
                </Box>
              </Box>
          )}
                      plain={false} reverse={false} dropProps={{"elevation": "xsmall", "plain": true}}/>
        </Box>
      </Box>
  )
}

export { ReportHeader };
