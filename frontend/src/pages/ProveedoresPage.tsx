import React from 'react';
import { Box, Typography, Container, Fade, Divider } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ProveedorForm from '../components/proveedores/ProveedorForm';
import ProveedorList from '../components/proveedores/ProveedorList';

const ProveedoresPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Fade in timeout={400}>
        <Box>
          {/* Title area — icon + heading */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <GroupIcon sx={{ fontSize: 36, color: 'primary.main', opacity: 0.85 }} />
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' } }}
            >
              Administración de Proveedores
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Content card */}
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              p: { xs: 2, md: 3 },
            }}
          >
            <ProveedorForm />
            <ProveedorList />
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default ProveedoresPage;
