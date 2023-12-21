import { Link } from 'react-router-dom';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import Message from '../../../components/Message'; 
import Loader from '../../../components/layouts/Loader'; 
import Paginate from '../../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductList= () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item>
          <Typography variant='h4'>Products</Typography>
        </Grid>
        <Grid item>
          <Button 
            startIcon={<AddIcon />} 
            variant='contained' 
            color='primary' 
            onClick={createProductHandler}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>

      {loadingCreate && <Loader />} 
      {loadingDelete && <Loader />} 
      {isLoading ? (
        <Loader /> 
      ) : error ? (
        <Message variant='danger'>{error}</Message> 
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>BRAND</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} €</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button startIcon={<EditIcon />} />
                      </Link>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteHandler(product._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductList;
