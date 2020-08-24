import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import LOOKOUT_OFFERS_QUERY from "../../gql-queries/lookoutOffers.graphql";
import { Grid, Box, InfiniteScroll, ResponsiveContext } from "grommet";
import { ReportHeader } from "@components/Report/ReportHeader";
import { Layout } from "@components/common/Layout";
import { withPage } from "../../next-utils";
import { OffersGrid } from "@components/Offer/Grid/OffersGrid";
import { atom } from "recoil";

export const gridScrollState = atom({
  key: 'gridScroll', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

const LookoutPage = withPage(() => {
  const router = useRouter();
  const {uuid} = router.query;
  const defaultWhere = {LookoutRequest: {hash: {_eq: uuid}}, userReviewStatus: {_neq: "REJECTED"}};
  const {data, refetch: refetchOffers} = useQuery(LOOKOUT_OFFERS_QUERY,
      {variables: {where: defaultWhere, orderBy: {rank: "desc"}}})
  const offers = (data?.Offers_connection?.edges || [])
      .map(({node}) => node)

  return <Layout>
    <ReportHeader refetchOffers={refetchOffers}/>
    <OffersGrid offers={offers}/>
  </Layout>
})

export default LookoutPage;
