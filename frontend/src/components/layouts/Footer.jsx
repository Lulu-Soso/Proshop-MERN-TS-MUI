import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Box display="flex" justifyContent="center" py={3}>
          <Typography variant="body1">
            ProShop &copy; {currentYear}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
