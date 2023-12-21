import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loader;
