import { Box, Grommet } from "grommet";

const Layout = ({children}) => {
  return <Box fill="vertical" overflow="visible">
    {children}
  </Box>;
}
export { Layout }
