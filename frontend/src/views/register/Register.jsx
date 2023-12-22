import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/layouts/Loader'; 
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h5'>
        Register
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          autoComplete='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        {isLoading && <Loader />}
      </form>
      <Grid container>
        <Grid item xs>
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            variant='body2'
          >
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
