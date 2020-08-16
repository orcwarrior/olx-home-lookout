import React, { useContext } from "react";
import Lottie from 'react-lottie';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import OFFER_QUERY from "@gql-queries/offer.graphql";
import { OfferCard } from "@components/Offer";
import { Box, Button, Heading } from "grommet";

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

  return offer.id ? renderOffer()
      : <Box justify="center" align="center" pad="medium">
        <Heading level={3} align="center">Offer not found</Heading>
        <Lottie width={350} height={350}
                options={{path: "https://assets7.lottiefiles.com/datafiles/S89j9kVV9KN43jn/data.json"}}/>
                <Button primary size="large" gap="large" pad="large"
                        style={{padding: 10}}
                        onClick={() => window.history.back()}>Go back</Button>
      </Box>
}

export default OfferPage;
