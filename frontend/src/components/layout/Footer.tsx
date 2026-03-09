import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'right',
      }}
    >
      <Typography variant="caption">
        e-Commerce Gapsi &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
