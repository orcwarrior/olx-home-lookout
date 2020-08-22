import "isomorphic-fetch";
import React from "react";
import { Box, Heading, Paragraph } from "grommet";
import { useQuery } from "@apollo/react-hooks";
import TEST_QUERY from "../gql-queries/test.graphql"
import { SubmitForLookout } from "@components/SubmitForLookout/SubmitForLookout";
import { Layout } from "@components/common/Layout";
import { withPage } from "../next-utils";

const Index = withPage(() => {
  const {data, loading} = useQuery(TEST_QUERY)
  const background = {
    image: "url(/assets/houses-top.jpg)",
    position: "center",
    opacity: "strong"
  }
  return <Layout>
    <Box background={background} fill="vertical" overflow="none" pad="large">
    <Heading level={1}>OLX Home lookout</Heading>
    <Paragraph>description lorem ispum</Paragraph>
    <Box pad="medium">
      Lorem ipsum dolor sit amet ..w
    </Box>
    <Box align="bottom" pad="medium" fill="vertical" justify="center" alignSelf="center" width="large">
      <SubmitForLookout/>
    </Box>
  </Box>
    </Layout>;
});


export default Index;
