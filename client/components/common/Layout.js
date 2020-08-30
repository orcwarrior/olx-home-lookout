import { Box, Grommet } from "grommet";

const Layout = ({children, overflow="visible"}) => {
  return <Box fill="vertical" overflow={overflow}>
    {children}
  </Box>;
}
export { Layout }
