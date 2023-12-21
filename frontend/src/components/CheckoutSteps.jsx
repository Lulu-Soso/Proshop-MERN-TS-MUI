import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Stepper activeStep={-1} alternativeLabel>
      <Step completed={step1}>
        <StepLabel>
          {step1 ? <Link to='/login'>Sign In</Link> : 'Sign In'}
        </StepLabel>
      </Step>
      <Step completed={step2}>
        <StepLabel>
          {step2 ? <Link to='/shipping'>Shipping</Link> : 'Shipping'}
        </StepLabel>
      </Step>
      <Step completed={step3}>
        <StepLabel>
          {step3 ? <Link to='/payment'>Payment</Link> : 'Payment'}
        </StepLabel>
      </Step>
      <Step completed={step4}>
        <StepLabel>
          {step4 ? <Link to='/placeorder'>Place Order</Link> : 'Place Order'}
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default CheckoutSteps;
