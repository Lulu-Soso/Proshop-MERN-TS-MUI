import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        my: 3,
        p: 1,
      }}
    >
      <Link to={`/product/${product._id}`}>
        <CardMedia component='img' image={product.image} alt={product.name} />
      </Link>

      <CardContent>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography gutterBottom variant='h6' component='div'>
            {product.name}
          </Typography>
        </Link>

        <Rating value={product.rating} text={`${product.numReviews} avis`} />

        <Typography variant='h5' color='text.secondary'>
          {product.price} €
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
