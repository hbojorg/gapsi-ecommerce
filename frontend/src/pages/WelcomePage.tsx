import React from 'react';
import { Box, Typography, Button, Fade, Grow, Paper, CircularProgress, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWelcome } from '../hooks/useWelcome';
import ErrorAlert from '../components/common/ErrorAlert';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { data, loading, error, resetError } = useWelcome();

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      {error && (
        <Fade in>
          <Box sx={{ mb: 2, width: '100%', maxWidth: 420 }}>
            <ErrorAlert message={error} onClose={resetError} />
          </Box>
        </Fade>
      )}

      <Grow in timeout={500}>
        <Paper
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 420,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {loading ? (
            <Box sx={{ py: 8 }}>
              <CircularProgress size={36} />
            </Box>
          ) : (
            <>
              {/* Main content area */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 5,
                  px: 4,
                  width: '100%',
                }}
              >
                {/* Candidato avatar — circular with soft blue halo */}
                <Fade in timeout={700}>
                  <Box
                    sx={{
                      width: 130,
                      height: 130,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      mb: 3,
                      boxShadow: (theme) =>
                        `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}, 0 4px 16px ${alpha(theme.palette.primary.main, 0.16)}`,
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/owner.png"
                      alt="Candidato"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Fade>

                {/* Welcome text */}
                <Fade in timeout={900}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      fontWeight: 300,
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Bienvenido {data?.candidatoName || 'Candidato 01'}
                  </Typography>
                </Fade>

                {/* Continue button */}
                <Fade in timeout={1100}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/proveedores')}
                    sx={{
                      px: 5,
                      py: 1.2,
                      fontSize: '0.95rem',
                    }}
                  >
                    Continuar
                  </Button>
                </Fade>
              </Box>

              {/* Version footer — inside the card, right-aligned like mockup */}
              <Box
                sx={{
                  width: '100%',
                  px: 3,
                  py: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'right',
                }}
              >
                <Typography variant="caption">
                  {data ? `versión ${data.appVersion}` : ''}
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Grow>
    </Box>
  );
};

export default WelcomePage;
