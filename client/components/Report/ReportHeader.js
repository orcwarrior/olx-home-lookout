import React, { useContext, useEffect, useState } from "react";
import { Anchor, Box, DropButton, Image, RangeSelector, ResponsiveContext, Text } from "grommet";
import MultiToggle from "react-multi-toggle";
import { Achievement, Ascend, Currency, Descend, History, Lounge } from "grommet-icons";
import { debounce } from "@utils/debounce";
import "./ReportHeader.scss";
import useQueryString from "@hooks/useQueryString";
import { useRecoilState } from "recoil";
import { gridScrollState } from "../../pages/lookout/[uuid]";
import { useRouter } from "next/router";

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
const queryDefaults = {where: whereDefaults, orderBy: {rank: "desc"}};

function updateOfferWhereAndOrder({pricesRange, areaRange, comfortRange, userReviewStatus, orderB, uuid}) {
  console.log("updateOfferWhereAndOrder...")
  return {
    where: {
      userReviewStatus,
      prices_full: _buildUpRangeFilter(pricesRange, PRICE_RANGE),
      attrs_area: _buildUpRangeFilter(areaRange, AREA_RANGE),
      indicators_comfort: _buildUpRangeFilter(comfortRange, COMFORT_RANGE),
      LookoutRequest: {hash: {_eq: uuid}}
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

function getSortColor(itemOrderBy, currentOrderBy) {
  if (JSON.stringify(itemOrderBy) === JSON.stringify(currentOrderBy))
    return "brand";
  else return "light-2";

}

const SortItem = ({sortObj, setOrderBy, orderBy, icon: Icon, children}) => {
  const color = getSortColor(sortObj, orderBy);
  return <Box align="center" justify="center" direction="row" gap="xsmall"
              onClick={() => setOrderBy(sortObj)} color="light-2">
    <Anchor color={color}>{children}</Anchor>
    {Icon ? <Icon size="medium" color={color}/> : null}
  </Box>
}
const QSHookJSONOpts = {
  toValue: (str) => {
    if (!str) return str;
    else {
      try {
        return JSON.parse(str);
      } catch (err) {
        // console.log(`err: `, err);
        return undefined;
      }
    }
  }, toQuery: (v) => {
    if (!v) return v;
    else {
      try {
        return JSON.stringify(v);
      } catch (err) {
        // console.log(`err: `, err);
        return undefined;
      }
    }
  }
};
const ReportHeader = ({refetchOffers}) => {

  const router = useRouter();
  const {uuid} = router.query;
  const [pricesRange, setPricesRange] = useQueryString("price", PRICE_RANGE)
  const [areaRange, setAreaRange] = useQueryString("area", AREA_RANGE)
  const [comfortRange, setComfortRange] = useQueryString("comfort", COMFORT_RANGE)
  const [userReviewStatus, setUserReviewStatus] = useQueryString("review", whereDefaults.userReviewStatus, QSHookJSONOpts)
  const [orderBy, setOrderBy] = useQueryString("order", {rank: "desc"}, QSHookJSONOpts)
  const [queryVarsJSON, setQueryVarsJSON] = useState(JSON.stringify(queryDefaults))

  const [gridScroll, setGridScroll] = useRecoilState(gridScrollState);

  const size = useContext(ResponsiveContext);
  const isMobile = size === "small";
  const isCollapsed = isMobile && !!gridScroll;

  const refetchDebounced = React.useCallback(debounce(refetchOffers, 1500), [])

  useEffect(() => {
    const updatedVariables = updateOfferWhereAndOrder({pricesRange, areaRange, comfortRange, userReviewStatus, orderBy, uuid})
    if (JSON.stringify(updatedVariables) !== queryVarsJSON) {
      refetchDebounced(updatedVariables)
    }
  }, [pricesRange, areaRange, comfortRange, userReviewStatus, orderBy])

  const logoProps = isMobile ? {
    fill: "horizontal",
    pad: {horizontal: "xlarge"},
    height: {min: "auto", max: "100%"}

  } : {fill: "vertical", width: "auto"};
  const sortByItemProps = {setOrderBy, orderBy};

  const headerClass = (isCollapsed) ? "lookout-header collapsed" : "lookout-header";
  return (
      <Box align="center" justify="center" fill="horizontal" direction="row-responsive" basis="xsmall"
           pad={{"horizontal": "large"}} background="black" height="auto" className={headerClass}>
        <Box align="center" justify="center" flex="shrink" {...logoProps}>
          <Image src="/assets/home-lookout-logo.png" fit="contain" fill={logoProps.fill}/>
        </Box>

        <Box className="menu-collapsible" direction="row-responsive" flex="grow">
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
            <Box align="center" justify="between" gap="small" pad="small" basis="1/4">
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
            <Box align="center" justify="between" gap="medium" pad="small" basis="1/4"
                 style={{marginTop: "6px"}}>
              <MultiToggle
                  options={USER_REVIEW_FILTER}
                  selectedOption={userReviewStatus}
                  onSelectOption={setUserReviewStatus}
                  label="Show offers"
              />
            </Box>
          </Box>

          <Box align="center" justify="center" direction="column" pad="medium">
            <DropButton label="Sortowanie" dropAlign={{"top": "bottom"}} dropContent={(
                <Box align="center" justify="center" pad="medium" name="dropContent" background={"black"}
                     animation="fadeIn" hoverIndicator={false} border={{"size": "small"}} gap="small">
                  <SortItem icon={Achievement} sortObj={{rank: "desc"}} {...sortByItemProps}>
                    Ocena
                  </SortItem>
                  <SortItem icon={History} sortObj={{createdAt: "desc"}} {...sortByItemProps}>
                    Od najnowszych
                  </SortItem>
                  <SortItem icon={Lounge} sortObj={{indicators_comfort: "desc"}} {...sortByItemProps}>
                    Komfort
                  </SortItem>
                  <SortItem icon={Lounge} sortObj={{deviationAvgM2Price: "asc"}} {...sortByItemProps}>
                    Odchyl. cenowe 📈
                  </SortItem>
                  <SortItem icon={Currency} sortObj={{indicators_deal: "desc"}} {...sortByItemProps}>
                    Okazja cenowa
                  </SortItem>
                  <SortItem sortObj={{prices_perM2: "asc"}} {...sortByItemProps}>
                    Cena m²
                  </SortItem>
                  <SortItem icon={Ascend} sortObj={{prices_full: "asc"}} {...sortByItemProps}>
                    Cena {/* rosnaco */}
                  </SortItem>
                  <SortItem icon={Descend} sortObj={{prices_full: "desc"}} {...sortByItemProps}>
                    Cena {/* malejaco */}
                  </SortItem>
                  <SortItem icon={Ascend} sortObj={{attrs_area: "asc"}} {...sortByItemProps}>
                    Powierzchnia {/* rosnaco */}
                  </SortItem>
                  <SortItem icon={Descend} sortObj={{attrs_area: "desc"}} {...sortByItemProps}>
                    Powierzchnia {/* malejaco */}
                  </SortItem>

                </Box>
            )}
                        plain={false} reverse={false} dropProps={{"elevation": "xsmall", "plain": true}}/>
          </Box>
        </Box>
      </Box>
  )
}

export { ReportHeader };
