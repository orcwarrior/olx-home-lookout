import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import OFFER_QUERY from "@gql-queries/offer.graphql";
import { OfferCard } from "@components/Offer";
import { Box } from "grommet";
import { NotFound } from "@components/common/NotFound";

const OfferPage = () => {
  const router = useRouter();
  const {id, email} = router.query;
  console.log({id, email});

  const {data} = useQuery(OFFER_QUERY, {variables: {id}})

  const [offer = {}] = (data?.Offers_connection?.edges || [])
      .map(({node}) => node)

  function renderOffer() {
    if (email) return <OfferCard {...offer} margin="auto"/>;

    return <Box width="large" justify="center" align="center" fill={false}>
      <OfferCard {...offer} key={offer.id} align="center" margin="auto"/>
    </Box>

  }

  return offer.id ? renderOffer() : <NotFound msg={"Offer not found"}/>

}

export default OfferPage;
