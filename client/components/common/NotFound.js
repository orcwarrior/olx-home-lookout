import React from "react";
import { Box, Button, Heading } from "grommet";
import Lottie from "react-lottie";

const NotFound = ({msg = "Not Found"}) => {
  return <Box justify="center" align="center" pad="medium">
    <Heading level={3} align="center">{msg}</Heading>
    <Lottie width={350} height={350}
            options={{path: "https://assets7.lottiefiles.com/datafiles/S89j9kVV9KN43jn/data.json"}}/>
    <Button primary size="large" gap="large" pad="large"
            style={{padding: 10}}
            onClick={() => window.history.back()}>Go back</Button>
  </Box>
}
export { NotFound }
