import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import SearchBox from '../SearchBox';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenu = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseAdminMenu = () => {
    setAdminAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <AppBar position='static' color='primary'>
      <Container>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            <img
              src={logo}
              alt='ProShop'
              style={{ verticalAlign: 'middle', marginRight: '10px' }}
            />
            Pixel
          </Typography>
          <SearchBox />
          <IconButton component={Link} to='/cart' color='inherit'>
            <Badge
              badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
              color='secondary'
            >
              <FaShoppingCart />
            </Badge>
          </IconButton>
          {userInfo ? (
            <>
              <IconButton color='inherit' onClick={handleUserMenu}>
                <FaUser />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to='/profile'
                  onClick={handleCloseUserMenu}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton component={Link} to='/login' color='inherit'>
              <FaUser />
            </IconButton>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <IconButton color='inherit' onClick={handleAdminMenu}>
                Admin
              </IconButton>
              <Menu
                anchorEl={adminAnchorEl}
                open={Boolean(adminAnchorEl)}
                onClose={handleCloseAdminMenu}
              >
                <MenuItem
                  component={Link}
                  to='/admin/userlist'
                  onClick={handleCloseAdminMenu}
                >
                  Users
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/admin/productlist'
                  onClick={handleCloseAdminMenu}
                >
                  Products
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/admin/orderlist'
                  onClick={handleCloseAdminMenu}
                >
                  Orders
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
      </AppBar>
    </header>

  );
};

export default Header;
