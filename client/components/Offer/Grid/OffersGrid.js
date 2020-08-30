import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@hooks/useWindowSize";
import { AutoSizer, CellMeasurer, CellMeasurerCache, ColumnSizer, List, Grid } from "react-virtualized";
import './OffersGrid.react-virtualized.scss';
import './OffersGrid.scss';
import { OfferCard } from "@components/Offer";
import { ResponsiveContext } from "grommet";
import { chunk, debounce } from "lodash";
import { NotFound } from "@components/common/NotFound";
import { useRecoilState } from "recoil";
import { gridScrollState } from "../../../pages/lookout/[uuid]";


const COL_MAX_WIDTH = 750;
const COL_MIN_WIDTH = 530;
const COL_MIN_MOBILE_WIDTH = 310;

function calculateGridCols(screenWidth, isMobile) {
  const minWidth = (isMobile) ? COL_MIN_MOBILE_WIDTH : COL_MIN_WIDTH;
  const _colsMax = Math.floor(screenWidth / minWidth);
  const _colWidthMax = screenWidth / _colsMax;
  // const cols = (_colWidthMax < COL_MAX_WIDTH) ? _colsMax
  //     : Math.ceil(screenWidth / COL_MAX_WIDTH);
  // const colsWidth = Math.round(screenWidth / cols);
  return [_colsMax, _colWidthMax];
}

const gridCache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 350,
});


const OffersGrid = ({offers}) => {
  if (!offers.length)
    return <NotFound msg={"No offers found!"}/>;


  const size = useContext(ResponsiveContext);
  const gridOverscan = (size === "small") ? 8 : 1;

  const {width} = useWindowSize();
  const isMobile = width < 480;
  const [gridScroll, setGridScroll] = useRecoilState(gridScrollState);
  const [colWidth, setColWidth] = React.useState(width);
  const [colsCnt, setColsCnt] = React.useState(1);
  const prepdOffers = useMemo(() => chunk(offers, colsCnt), [offers, colsCnt]);
  const rowCount = Math.ceil(prepdOffers.length);

  useEffect(() => {
    const [colsCnt, colWidth] = calculateGridCols(width, isMobile);
    setColsCnt(colsCnt);
    setColWidth(colWidth);
  }, [width])
  // console.log({colsCnt, rowCount, colWidth});


  return <AutoSizer>
    {({height, width}) => (
        <List
            deferredMeasurementCache={gridCache}
            height={height}
            rowCount={rowCount}
            rowHeight={gridCache.rowHeight}
            rowRenderer={OfferGridCell}
            width={width}
            overscanRowCount={gridOverscan}
            offers={prepdOffers}
            vCols={colsCnt}
            vColWidth={colWidth}

            onScroll={({scrollTop}) => {
              setGridScroll(scrollTop)
            }}

        />
    )}
  </AutoSizer>;

  // return <AutoSizer
  //     defaultWidth={320}
  //     defaultHeight={500}>
  //   {({height, width}) => (
  //       <Grid
  //           deferredMeasurementCache={gridCache}
  //           cellRenderer={OfferGridCell}
  //           columnCount={colsCnt}
  //           columnWidth={colWidth}
  //           height={height}
  //           rowCount={rowCount}
  //           rowHeight={500}
  //           overscanRowCount={gridOverscan}
  //           width={width}
  //       />
  //   )}
  // </AutoSizer>;

}
//
// let cellCache = new CellMeasurerCache({
//       fixedWidth: true,
//       minHeight: 500,
//     });
//
// function _getCellCache(width) {
//   if (width === "auto") return undefined;
//   if (cellCache && cellCache._defaultWidth === width) return cellCache;
//
//   cellCache = new CellMeasurerCache({
//     fixedWidth: true,
//     minHeight: 500,
//   });
//   console.log(`newCache[${width}]: `, cellCache);
//   return cellCache;
// }

const OfferRow = ({rowOffers, measure, registerChild, style}) => {

  const measureOpt = useCallback(debounce(measure, 500), [measure]);
  // const measureRoute = (...args) => {
  //   console.log("measure called!", args)
  //   measure(...args);
  // }
  const cols = rowOffers.length;
  return <div style={style} className="offers-row">
    {rowOffers.map(offer => <OfferCard {...offer} key={offer.id}
                                       measure={measureOpt} ref={registerChild}
                                       style={{width: `${100 / cols}%`}}
        />
    )}
  </div>
}
const OfferGridCell = ({
                         index, // Horizontal (column) index of cell
                         key, // Unique key within array of cells
                         parent, // Reference to the parent Grid (instance)
                         style, // Style object to be applied to cell (to position it);
                       }) => {
  // const {width} = style;
  const {props: {vCols, vColWidth, offers, listRef}} = parent;
  // console.log(`style: `, style);
  // console.log(`parent.props: `, parent.props);
  // const cache = useMemo(() => _getCellCache(width), [width]);
  // const cache = cellCache;

  // const [cache, setCache] = useState(_getCellCache(style));
  // console.log(`cache: `, cache);
  //
  // useEffect(() => {
  //   if (width !== cache._defaultWidth)
  //     setCache(_getCellCache(width))
  // }, [width])
  // const flatIdx = rowIndex * columnCount + columnIndex;
  const offersRow = offers[index];


  return <CellMeasurer
      cache={gridCache}
      key={key}
      parent={parent}
      columnIndex={0}
      rowIndex={index}>
    {({measure, registerChild}) => (
        <OfferRow rowOffers={offersRow} style={style} measure={measure} registerChild={registerChild}/>
    )}
  </CellMeasurer>
}

export { OffersGrid }
