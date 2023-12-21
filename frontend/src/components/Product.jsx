import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from './Rating'; // Assurez-vous que ce composant est compatible avec Material-UI

const Product = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', my: 3, p: 1 }}>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
        />
      </Link>

      <CardContent>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
        </Link>

        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />

        <Typography variant="h5" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
