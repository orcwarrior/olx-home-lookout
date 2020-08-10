import React from "react"
import { Button, Box } from "grommet";

const StepWrapper = ({children, ...props}) => {
  const {currentStep, totalSteps, previousStep, nextStep} = props;
  const isLastStep = (currentStep === totalSteps);

  const btnProps = {size: "large", padding: "large"};
  const buttons = <>
    {<Button {...btnProps}  label="Back" onClick={previousStep}/>}
    {!isLastStep && <Button {...btnProps} primary label="Next" onClick={nextStep}/>}
    {isLastStep && <Button {...btnProps} primary label="Submit" onClick={nextStep}/>}
  </>

  return <Box
      pad="large"
      align="stretch"
      alignSelf="center"
      basis="full"
      fill="true">
    {children}
    <Box align="center" alignSelf="center" pad="medium" justify="evenly"
         width="medium" direction="row-responsive">
      {buttons}
    </Box>
  </Box>
}

export { StepWrapper }
