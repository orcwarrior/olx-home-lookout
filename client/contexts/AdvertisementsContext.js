import React, { useState, useMemo } from "react";
import { AdDetailsSplash } from "@components/Advertisements/AdDetailsSplash";

const AdvertisementsContext = React.createContext({});

const initialSplashAd = {origin: undefined, advertisement: undefined};
const initialTimelineAd = {idx: null, advertisements: [], hasMore: true, loadMore: () => null};

const AdvertisementsProvider = ({children}) => {

    const [splashAd, setSplashAd] = useState(initialSplashAd);
    const [timelineAd, setTimelineAd] = useState(initialTimelineAd);

    const ctx = useMemo(() => ({
        splashAd, setSplashAd, clearSplashAd: () => setSplashAd(initialSplashAd),
        timelineAd, setTimelineAd, clearTimelineAd: () => setTimelineAd(initialTimelineAd)
    }), [splashAd, timelineAd]);

    return React.useMemo(() => (<AdvertisementsContext.Provider value={ctx}>
        <AdDetailsSplash/>
        {children}
    </AdvertisementsContext.Provider>), [children, ctx]);
};

export { AdvertisementsContext, AdvertisementsProvider };
