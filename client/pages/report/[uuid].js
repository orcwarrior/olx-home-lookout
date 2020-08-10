import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import LOOKOUT_OFFERS_QUERY from "../../gql-queries/lookoutOffers.graphql";
import { Grid, Box, InfiniteScroll, Text, DropButton, RangeInput, Image } from "grommet";
import { Ascend, Descend } from "grommet-icons";
import { OfferCard } from "@components/Offer";

const ReportHeader = () => {
  return (
      <Box align="center" justify="center" fill="horizontal" direction="row-responsive" basis="xsmall" flex="grow"
           pad={{"horizontal": "large"}}>
        <Box align="center" justify="center" flex="shrink" fill="vertical">
          <Image src="http://localhost:3000/assets/home-lookout-logo.PNG" fit="contain" fill="vertical"/>
        </Box>

        <Box align="stretch" justify="center" flex="grow" direction="row-responsive" gap="large">
          <Box align="center" justify="between" gap="xsmall" pad="small">
            <Text>
              cena

            </Text>
            <RangeInput max={3000} min={1} step={1} value={0}/>
          </Box>
          <Box align="center" justify="between" gap="xsmall" pad="small">
            <Text>
              powierzchnia

            </Text>
            <RangeInput max={120} min={1} step={1} value={0}/>
          </Box>
          <Box align="center" justify="between" gap="xsmall" pad="small">
            <Text>
              komfort

            </Text>
            <RangeInput max={120} min={1} step={1} value={0}/>
          </Box>
        </Box>
        <Box align="center" justify="center" direction="column">
          <DropButton label="Sortowanie" dropAlign={{"top": "bottom"}} dropContent={(
              <Box align="center" justify="center" pad="medium" name="dropContent" background={"black"}
                   animation="fadeIn" hoverIndicator={false} border={{"size": "small"}} gap="small">
                <Text color="accent-1">
                  Okazja cenowa

                </Text>
                <Text color="accent-1">
                  Komfort
                </Text>
                <Text color="accent-1">
                  Odchyl. cenowe
                </Text>
                <Text color="accent-1">
                  Cena m²
                </Text>
                <Box align="center" justify="center" direction="row" gap="xsmall">
                  <Text color="accent-1">
                    Cena
                  </Text>
                  <Ascend color="accent-1" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall">
                  <Text color="accent-1">
                    Cena
                  </Text>
                  <Descend color="accent-1" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall">
                  <Text color="accent-1">
                    Powierzchnia

                  </Text>
                  <Ascend color="accent-1" size="medium"/>
                </Box>
                <Box align="center" justify="center" direction="row" gap="xsmall">
                  <Text color="accent-1">
                    Powierzchnia

                  </Text>
                  <Descend color="accent-1" size="medium"/>
                </Box>
              </Box>
          )}
                      plain={false} reverse={false} dropProps={{"elevation": "xsmall", "plain": true}}/>
        </Box>
      </Box>
  )
}
const ReportPage = () => {
  const router = useRouter();
  const {uuid} = router.query;
  const defaultWhere = {LookoutRequest: {hash: {_eq: uuid}}};
  const {data, loading} = useQuery(LOOKOUT_OFFERS_QUERY,
      {variables: {where: defaultWhere}})
  const offers = (data?.Offers_connection?.edges || [])
      .map(({node}) => node)
  // .slice(2, 5);
  const [sample = {}] = offers;


  return <>
    <ReportHeader/>
    {/*<pre>JSON: {JSON.stringify(offers, null, 2)}</pre>*/}
    <Box overflow="auto" gap="none" fill="vertical" pad="small">
      <Grid gap="small" columns={{"size": "500px", "count": "fit"}} fill="horizontal" rows={[""]}>
        <InfiniteScroll items={offers}>
          {(offer) => <OfferCard {...offer}/>}
        </InfiniteScroll>
      </Grid>
    </Box>
  </>
}

export default ReportPage;
