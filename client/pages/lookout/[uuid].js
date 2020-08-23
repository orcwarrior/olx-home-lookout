import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import LOOKOUT_OFFERS_QUERY from "../../gql-queries/lookoutOffers.graphql";
import { Grid, Box, InfiniteScroll, ResponsiveContext } from "grommet";
import { OfferCard } from "@components/Offer";
import { ReportHeader } from "@components/Report/ReportHeader";
import { Layout } from "@components/common/Layout";
import { NotFound } from "@components/common/NotFound";
import { withPage } from "../../next-utils";

const LookoutPage = withPage(() => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const isMobile = (size === "small");
  const {uuid} = router.query;
  const defaultWhere = {LookoutRequest: {hash: {_eq: uuid}}, userReviewStatus: {_neq: "REJECTED"}};
  const {data, refetch: refetchOffers} = useQuery(LOOKOUT_OFFERS_QUERY,
      {variables: {where: defaultWhere, orderBy: {rank: "desc"}}})
  const offers = (data?.Offers_connection?.edges || [])
      .map(({node}) => node)

  const gridColumns = isMobile
  ? {"size": "flex", "count": "fit"}
  : {"size": "500px", "count": "fit"}
  const wrapperOverflow = isMobile ? "visible" : "auto";
  const infiniteScrollAncestorRef = isMobile ? ".offers-grid" : undefined;
  const infiniteScrollStep = isMobile ? 8 : 12;

  console.log("offers.cnt: ", offers.length)
  return <Layout>
    <ReportHeader refetchOffers={refetchOffers}/>
    <Box overflow={wrapperOverflow} gap="none" pad="small" height="auto" >
      {offers.length ? <Grid gap="small" columns={gridColumns} rows={[""]}>
        <InfiniteScroll items={offers} step={infiniteScrollStep} onMore={() => alert("load more items")} >
          {(offer, idx) => <OfferCard {...offer} key={idx}/>}
        </InfiniteScroll>
      </Grid> : <NotFound msg={"No items found"}/>}
    </Box>
  </Layout>
})

export default LookoutPage;
