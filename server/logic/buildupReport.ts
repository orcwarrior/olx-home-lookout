import {LookoutReport, LookoutRequest, Offer} from "@db/schemas";
import knexClient from "@root/knexClient";
import {chain, drop} from "lodash";
import {sendReportEmail} from "@logic/sendReportEmail";

function selectFeaturedOffers(newOffers: Offer[], report: LookoutReport, lookout: LookoutRequest): Offer[] {

    const higherAvg = Math.max(report.avgRank, lookout.avgRank);
    const highlightedOffers = newOffers.filter(o => o.rank > higherAvg * (3 / 4));

    const offersToTake = Math.max(
        highlightedOffers.length / 2,
        Math.min(4, highlightedOffers.length));

    return chain(highlightedOffers)
        .orderBy(["rank", "desc"])
        .take(offersToTake)
        .value();
}

async function buildupReport(lookout: LookoutRequest, offers: Offer[], newOffers: Offer[]): Promise<LookoutReport> {

    if (!newOffers.length) return null;

    const newOffersRank = newOffers.reduce((sum, o) => sum + o.rank, 0) / newOffers.length;
    console.log(`offers: `, offers.length);
    console.log(`newOffers: `, newOffers.length, "rank: ", newOffersRank, newOffers.map(o => o.rank).join("+"));
    console.log("allOffers.rank: ", lookout.avgRank);
    console.log(`lookout: `, lookout);
    const lastReport = await knexClient<LookoutReport>("LookoutReports")
        .select()
        .where({lookoutRequestId: lookout.id})
        .orderBy([{column: "createdAt", order: "desc"}])
        .first();

    const report: Partial<LookoutReport> = {
        lookoutRequestId: lookout.id,
        avgRank: newOffersRank,
        avgRankTrend: ((newOffersRank - lookout.avgRank) * 100) / lookout.avgRank,
        offersSince: lastReport?.createdAt || lookout.createdAt,
    };
    const [dbReport] = await knexClient<LookoutReport>("LookoutReports")
        .insert(report)
        .returning("*");
    console.log(`dbReport: `, dbReport);


    if (newOffers.length)
        await knexClient<Offer>("Offers")
            .whereIn("id", newOffers.map(o => o.id))
            .update({
                fromReportId: dbReport.id
            });

    const highlightOffers = selectFeaturedOffers(newOffers, dbReport, lookout);

    if (highlightOffers.length) {

        await knexClient<Offer>("Offers")
            .whereIn("id", highlightOffers.map(o => o.id))
            .update({
                isReportHighlight: true,
            });

        sendReportEmail(dbReport, lookout);
    }
    return dbReport;

}

export {buildupReport};
