import { useState, useEffect } from "react";
import { getUser } from "@components/generic/NotificationsSection/Notifications.fixtures";

function getSize() {
    return {
        width: process.browser ? window.innerWidth : undefined,
        height: process.browser ? window.innerHeight : undefined
    };
}

// Hook
function useWindowSize() {

    const [width, setWidth] = useState(getSize().width);
    const [height, setHeight] = useState(getSize().height);

    useEffect(() => {
        if (!process.browser)
            return false;

        function handleResize() {
            const newSize = getSize();
            if (newSize.width !== width)
                setWidth(newSize.width);
            if (newSize.height !== height)
                setHeight(newSize.height);

        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [height, width]); // Empty array ensures that effect is only run on mount and unmount

    return {width, height};
}

export { useWindowSize, getSize };
