import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

const AdminRoute = () => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default AdminRoute;
