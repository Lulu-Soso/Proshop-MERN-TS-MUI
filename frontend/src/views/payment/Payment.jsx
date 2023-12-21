import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormContainer from '../../components/common/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePaymentMethod } from '../../slices/cartSlice';

const Payment = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Container component='main' maxWidth='sm'>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <Typography variant='h4' gutterBottom>
          Payment Method
        </Typography>
        <form onSubmit={submitHandler}>
          <FormControl component='fieldset' className='my-3'>
            <FormLabel component='legend'>Select Method</FormLabel>
            <RadioGroup
              aria-label='paymentMethod'
              name='paymentMethod'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value='PayPal'
                control={<Radio />}
                label='PayPal or Credit Card'
              />
            </RadioGroup>
          </FormControl>

          <Button type='submit' variant='contained' color='primary'>
            Continue
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Payment;
