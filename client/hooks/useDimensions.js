import _useDimensions from "react-use-dimensions";

const useDimensions = (process.browser)
    ? _useDimensions
    : () => [null, {}];

export default useDimensions;
