import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const Cart= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant='h4' gutterBottom>
        Panier d'Achat
        </Typography>
        {cartItems.length === 0 ? (
          <Message>
            Votre panier est vide <Link to='/'>Retourner</Link>
          </Message>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item._id} divider>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', borderRadius: '4px' }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Grid>
                  <Grid item xs={2}>
                    {item.price} €
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      fullWidth
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      type='button'
                      variant='outlined'
                      color='error'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <Typography variant='h6'>
                Sous-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) articles
                </Typography>
                <Typography variant='h6'>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  fullWidth
                >
                  Procéder au paiement
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
