import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import CheckoutSteps from '../../components/CheckoutSteps'; // Assurez-vous que ce composant est compatible avec Material-UI
import Loader from '../../components/layouts/Loader';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <Typography variant='h6'>Shipping</Typography>
              <Typography>
                <strong>Adresse:</strong>
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city} 
                 ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
              </Typography>
            </ListItem>

            <ListItem>
              <Typography variant='h6'>Payment Method</Typography>
              <Typography>
                <strong>Méthode: </strong>
                {cart.paymentMethod}
              </Typography>
            </ListItem>

            <ListItem>
              <Typography variant='h6'>Order Items</Typography>
              {cart.cartItems.length === 0 ? (
                <Message>Votre panier est vide</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container spacing={1}>
                        <Grid item md={1}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item md={4}>
                          {`${item.qty} x $${item.price} = $${
                            item.qty * item.price
                          }`}
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Résumé de la commande</Typography>
              {/* Display order summary here */}

              {error && <Message variant='danger'>{error}</Message>}

              <Button
                type='button'
                variant='contained'
                color='primary'
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                fullWidth
              >
                Passer Commande
              </Button>
              {isLoading && <Loader />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrder;
