import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1.5,
            userSelect: 'none',
          }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt="Gapsi Logo"
            sx={{ height: 37, width: 'auto' }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'text.secondary',
            }}
          >
            e-Commerce Gapsi
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
