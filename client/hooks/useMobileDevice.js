import React, { useCallback, useMemo } from "react";
import { getSize } from "@hooks/useWindowSize";

//$screen-lg-min: 992px;
const MIN_DESKTOP_WIDTH = 992;

// Hook
function useMobileDevice() {

    const width = getSize()?.width;

    console.log(`width: `, width);
    const isMobile = useMemo(() => width < MIN_DESKTOP_WIDTH, [width]);

    return isMobile;
}

export { useMobileDevice };
