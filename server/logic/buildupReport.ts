import {LookoutReport, LookoutRequest, Offer} from "@db/schemas";
import knexClient from "/knexClient";
import {chain, drop} from "lodash";

function selectFeaturedOffers(newOffers: Offer[], report: LookoutReport, lookout: LookoutRequest): Offer[] {

    const higherAvg = Math.max(report.avgRank, lookout.avgRank);
    const aboveAvgOffers = newOffers.filter(o => o.rank > higherAvg);

    const offersToTake = Math.max(
        aboveAvgOffers.length / 2,
        Math.min(4, aboveAvgOffers.length));

    return chain(aboveAvgOffers)
        .orderBy(["rank", "desc"])
        .take(offersToTake)
        .value();
}

async function buildupReport(lookout: LookoutRequest, offers: Offer[], newOffers: Offer[]): Promise<LookoutReport> {

    console.log(`offers: `, offers.length);
    console.log(`newOffers: `, newOffers.length);

    if (!newOffers.length) return null;

    const allOffersRank = offers.reduce((avg, o) => avg + o.rank, 0) / offers.length;
    const newOffersRank = newOffers.reduce((avg, o) => avg + o.rank, 0) / (newOffers.length || 1);
    const lastReport = await knexClient<LookoutReport>("LookoutReports")
        .select()
        .where({lookoutRequestId: lookout.id})
        .orderBy([{column: "createdAt", order: "desc"}])
        .first();

    const report: Partial<LookoutReport> = {
        lookoutRequestId: lookout.id,
        avgRank: newOffersRank,
        avgRankTrend: ((newOffersRank - allOffersRank) * 100) / allOffersRank,
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

    if (highlightOffers.length)
        await knexClient<Offer>("Offers")
            .whereIn("id", highlightOffers.map(o => o.id))
            .update({
                isReportHighlight: true,
            });

    return dbReport;

}

export {buildupReport};
