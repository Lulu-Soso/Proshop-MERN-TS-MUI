import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material'; // Assurez-vous que ces importations sont correctes
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div>
      {products.length > 0 && (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          bgcolor='primary.main'
          p={2}
          mb={4}
          my={2}
        >
          <Typography variant='h4' component='div' color='white'>
            Top Products
          </Typography>
        </Box>
      )}
      <Box display='flex' justifyContent='center'>
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              border='1px solid #ccc'
              borderRadius='4px'
              p={2}
              m={2}
              width='200px'
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', marginBottom: '8px' }}
              />
              <Typography variant='body1' component='div' align='center'>
                {product.name}
              </Typography>
              <Typography variant='body2' component='div' align='center'>
                ${product.price}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default ProductCarousel;
