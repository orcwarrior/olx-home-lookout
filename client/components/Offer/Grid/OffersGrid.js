import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@hooks/useWindowSize";
import { CellMeasurer, CellMeasurerCache, ColumnSizer, Grid } from "react-virtualized";
import './OffersGrid.scss';
import { OfferCard } from "@components/Offer";
import { ResponsiveContext } from "grommet";


const COL_MAX_WIDTH = 670;
const gridCache = new CellMeasurerCache({
  fixedWidth: true,
  // minHeight: 500,
});


const OffersGrid = ({offers}) => {
  const {width} = useWindowSize();
  const size = useContext(ResponsiveContext);
  const numColumns = Math.ceil(width / COL_MAX_WIDTH);
  const [colWidth, setColWidth] = React.useState(0);
  const gridOverscan = (size === "small") ? 8 : 1;
  const listRef = useRef(null);
  // const cache = useMemo(() => colWidth > 0 && _getCellCache(colWidth), [colWidth]);
  console.log({autoWidth: colWidth, numColumns});

  return <ColumnSizer
      columnMaxWidth={COL_MAX_WIDTH}
      columnMinWidth={310}
      columnCount={numColumns}
      width={width}>
    {({adjustedWidth, getColumnWidth, registerChild}) => {
      console.log({adjustedWidth, getColumnWidth, registerChild, colWidth: getColumnWidth()})
      setColWidth(getColumnWidth())

      return <Grid
          ref={listRef}
          columnWidth={getColumnWidth}
          columnCount={numColumns}
          deferredMeasurementCache={gridCache}
          height={1000}
          overscanRowCount={gridOverscan}
          cellRenderer={OfferGridCell}
          rowHeight={gridCache?.rowHeight}
          listRef={listRef}
          offers={offers}
          rowCount={offers.length / numColumns}
          width={adjustedWidth}
      />
    }
    }
  </ColumnSizer>;
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

const OfferGridCell = ({
                         columnIndex, // Horizontal (column) index of cell
                         key, // Unique key within array of cells
                         parent, // Reference to the parent Grid (instance)
                         rowIndex, // Vertical (row) index of cell
                         style, // Style object to be applied to cell (to position it);
                       }) => {
  // const {width} = style;
  const {props: {columnCount, offers, listRef}} = parent;
  console.log(`listRef: `, listRef);
  console.log(`parent.props: `, parent.props);
  // const cache = useMemo(() => _getCellCache(width), [width]);
  // const cache = cellCache;

  // const [cache, setCache] = useState(_getCellCache(style));
  // console.log(`cache: `, cache);
  //
  // useEffect(() => {
  //   if (width !== cache._defaultWidth)
  //     setCache(_getCellCache(width))
  // }, [width])
  const flatIdx = rowIndex * columnCount + columnIndex;
  const offer = offers[flatIdx];



  return <CellMeasurer
      cache={gridCache}
      columnIndex={columnIndex}
      key={key}
      parent={parent}
      rowIndex={rowIndex}>
    {({registerChild}) => (
        <div style={{...style, height: "auto"}}>
          <OfferCard {...offer} ref={registerChild} listRef={listRef} rowIndex={rowIndex}/>
        </div>
    )}
  </CellMeasurer>
}

export { OffersGrid }
