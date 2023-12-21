import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'; 
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../slices/productsApiSlice';
import Rating from '../../components/Rating';
import Loader from '../../components/layouts/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { addToCart } from '../../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              color='primary'
              style={{ margin: '20px' }}
            >
              Go Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '100%' }}
              />
            </Grid>
            <Grid item md={3}>
              <List>
                <ListItem>
                  <Typography variant='h5'>{product.name}</Typography>
                </ListItem>
                <ListItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListItem>
                <ListItem>Price: ${product.price}</ListItem>
                <ListItem>Description: {product.description}</ListItem>
              </List>
            </Grid>
            <Grid item md={3}>
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item>Price:</Grid>
                        <Grid item>
                          <strong>{product.price}€</strong>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item>Status:</Grid>
                        <Grid item>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Grid>
                      </Grid>
                    </ListItem>
                    {product.countInStock > 0 && (
                      <ListItem>
                        <Grid container>
                          <Grid item>Qty</Grid>
                          <Grid item>
                            <FormControl fullWidth>
                              <Select
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <MenuItem key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )}
                    <ListItem>
                      <Button
                        variant='contained'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                        fullWidth
                      >
                        Add To Cart
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} className='review'>
            <Grid item md={6}>
              <Typography variant='h5'>Reviews</Typography>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <List>
                {product.reviews.map((review) => (
                  <ListItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListItem>
                ))}
                <ListItem>
                  <Typography variant='h6'>Write a Customer Review</Typography>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <FormControl fullWidth margin='normal'>
                        <Typography>Rating</Typography>
                        <Select
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <MenuItem value=''>Select...</MenuItem>
                          <MenuItem value='1'>1 - Poor</MenuItem>
                          <MenuItem value='2'>2 - Fair</MenuItem>
                          <MenuItem value='3'>3 - Good</MenuItem>
                          <MenuItem value='4'>4 - Very Good</MenuItem>
                          <MenuItem value='5'>5 - Excellent</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth margin='normal'>
                        <Typography>Comment</Typography>
                        <TextField
                          required
                          multiline
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </FormControl>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='contained'
                        color='primary'
                      >
                        Submit
                      </Button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductScreen;
