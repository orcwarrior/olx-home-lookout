import * as Crawler from "crawler";


const crawler = new Crawler({
    // rateLimit: 200,
    // maxConnections: 6,
    jQuery: true
});

let lastRateLimitedQueueInsert = 1;

const RATE_LIMIT_MS = 290;

function crawlerRateLimitedQueue(options) {
    const nowTS = new Date().valueOf();
    const awaitMs = Math.max(lastRateLimitedQueueInsert + RATE_LIMIT_MS - nowTS, 0);
    lastRateLimitedQueueInsert = nowTS + awaitMs;

    // console.log("Rate limit by: ", awaitMs);
    if (awaitMs > 0) setTimeout(() => crawler.queue(options), awaitMs);
    else crawler.direct(options);
}

export {crawler, crawlerRateLimitedQueue};
