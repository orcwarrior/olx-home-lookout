import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import LOOKOUT_OFFERS_QUERY from "../../gql-queries/lookoutOffers.graphql";
import { Grid, Box, InfiniteScroll } from "grommet";
import { OfferCard } from "@components/Offer";
import { ReportHeader } from "@components/Report/ReportHeader";
import { Layout } from "@components/common/Layout";
import { NotFound } from "@components/common/NotFound";

const ReportPage = () => {
  const router = useRouter();
  const {uuid} = router.query;
  const defaultWhere = {LookoutRequest: {hash: {_eq: uuid}}, userReviewStatus: {_neq: "REJECTED"}};
  const {data, refetch: refetchOffers} = useQuery(LOOKOUT_OFFERS_QUERY,
      {variables: {where: defaultWhere}})
  const offers = (data?.Offers_connection?.edges || [])
      .map(({node}) => node)


  return <Layout>
    <ReportHeader refetchOffers={refetchOffers}/>
    <Box overflow="auto" gap="none" fill="vertical" pad="small">
      {offers.length ? <Grid gap="small" columns={{"size": "500px", "count": "fit"}} fill="horizontal" rows={[""]}>
        <InfiniteScroll items={offers} step={12}>
          {(offer) => <OfferCard {...offer} key={offer.id}/>}
        </InfiniteScroll>
      </Grid> : <NotFound msg={"No items found"}/>}
    </Box>
  </Layout>
}

export default ReportPage;
