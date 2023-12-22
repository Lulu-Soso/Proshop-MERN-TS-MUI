import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Box display='flex' justifyContent='center' py={3}>
          <Typography variant='body1'>Pixel &copy; {currentYear}</Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
