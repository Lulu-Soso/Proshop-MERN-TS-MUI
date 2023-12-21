import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Paper, Grid, Typography } from '@mui/material';
import Message from '../../../components/Message'; 
import Loader from '../../../components/layouts/Loader'; 
// import FormContainer from '../../../components/common/FormContainer'; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../../slices/usersApiSlice';

const UserEdit = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to='/admin/userlist' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='primary'>
              Go Back
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>Edit User</Typography>
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
                label='Email Address'
                type='email'
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin='normal'
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    name="isAdmin"
                  />
                }
                label="Is Admin"
                style={{ margin: '1rem 0' }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
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

export default UserEdit;
