import { Box, Grommet } from "grommet";

const Layout = ({children}) => {
  return <Box fill="vertical" justify="center">
    {children}
  </Box>;
}
export { Layout }
