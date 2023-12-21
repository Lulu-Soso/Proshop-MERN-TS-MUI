import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';
import Message from '../../../components/Message'; 
import Loader from '../../../components/layouts/Loader'; 
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice';

const ProductEdit = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='primary'>
              Go Back
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>Edit Product</Typography>
        </Grid>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader /> 
        ) : error ? (
          <Message variant='danger'>{error}</Message> 
        ) : (
          <Grid item xs={12}>
            <form onSubmit={submitHandler}>
              <TextField
                label='Name'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin='normal'
                fullWidth
              />
              <TextField
                label='Price'
                type='number'
                variant='outlined'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                margin='normal'
                fullWidth
              />
              <TextField
                label='Image URL'
                variant='outlined'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                margin='normal'
                fullWidth
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadFileHandler}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" style={{ margin: '1rem 0' }}>
                  Upload Image
                </Button>
              </label>
              {loadingUpload && <Loader />} {/* Consider updating this component */}
              <TextField
                label='Brand'
                variant='outlined'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                margin='normal'
                fullWidth
              />
              <TextField
                label='Count In Stock'
                type='number'
                variant='outlined'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                margin='normal'
                fullWidth
              />
              <TextField
                label='Category'
                variant='outlined'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin='normal'
                fullWidth
              />
              <TextField
                label='Description'
                variant='outlined'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin='normal'
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                style={{ marginTop: '1rem' }}
              >
                Update
              </Button>
            </form>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ProductEdit;
