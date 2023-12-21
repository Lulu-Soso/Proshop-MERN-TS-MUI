import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Product from '../../components/Product';
import Loader from '../../components/layouts/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import ProductCarousel from '../../components/ProductCarousel';
import Meta from '../../components/Meta';

const Home = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/'
          className='mb-4'
        >
          Go Back
        </Button>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Derniers Produits</h1>
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} lg={4} xl={3}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default Home;
