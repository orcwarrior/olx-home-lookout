import React from "react"
import StepWizard from 'react-step-wizard';
import { Step1EmailAndUrl } from "./Step1EmailAndUrl";
import { StepWrapper } from "./StepWrapper";
import { Box } from "grommet";


const SubmitForLookout = () => {

  return <Box>
    <StepWizard isLazyMount={true}>
      <Step1EmailAndUrl/>
      <StepWrapper>
        <div>step 2 tmp</div>
      </StepWrapper>
    </StepWizard>
  </Box>
}

export { SubmitForLookout }
