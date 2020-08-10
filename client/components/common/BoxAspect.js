import React from "react"
import { Box } from "grommet";

const BoxAspect = ({aspectRatio, ...props}) => {
  const styleWithAspect = {
    ...props.style,
    width: "100%",
    position: "relative",
    paddingBottom: `${aspectRatio * 100}%`
  }
  const innerWrapperStyle = {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
  }

  return <Box {...props} style={styleWithAspect}>
    <div style={innerWrapperStyle}>
      {props.children}
    </div>
  </Box>

}

export { BoxAspect }
