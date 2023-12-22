import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/layouts/Loader';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{ mt: 3 }}>
        Se connecter
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          label='Adresse mail'
          variant='outlined'
          type='email'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Mot de passe'
          variant='outlined'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={isLoading}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Se connecter
        </Button>
        {isLoading && <Loader />}
      </form>
      <Grid container>
        <Grid item xs>
          <Typography variant='body1'>
          Nouveau client?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              S'inscrire
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
