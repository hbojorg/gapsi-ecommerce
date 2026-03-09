import { createTheme, alpha } from '@mui/material/styles';

/**
 * Gapsi e-Commerce Theme
 *
 * Intent: Corporate supplier management — organized, trustworthy, efficient.
 * Palette: Cool grays for structure, a single blue accent for action and identity.
 * Depth: Borders-first with whisper-quiet elevation shifts.
 * Surfaces: Light neutral canvas, white paper, subtle gray for inset areas.
 * Typography: Roboto — neutral, professional, strong weight hierarchy.
 * Spacing: 8px base unit (MUI default).
 */

const ink = {
  primary: '#2d3748',
  secondary: '#5a6577',
  tertiary: '#8b95a5',
  muted: '#b0b8c4',
};

const surface = {
  canvas: '#f4f6f8',
  paper: '#ffffff',
  inset: '#eef1f5',
  hover: '#f8f9fb',
};

const border = {
  standard: 'rgba(0, 0, 0, 0.08)',
  subtle: 'rgba(0, 0, 0, 0.05)',
  emphasis: 'rgba(0, 0, 0, 0.14)',
};

const brand = {
  main: '#2196f3',
  light: '#64b5f6',
  dark: '#1976d2',
  surface: alpha('#2196f3', 0.06),
};

const theme = createTheme({
  palette: {
    primary: {
      main: brand.main,
      light: brand.light,
      dark: brand.dark,
    },
    secondary: {
      main: '#607d8b',
    },
    background: {
      default: surface.canvas,
      paper: surface.paper,
    },
    text: {
      primary: ink.primary,
      secondary: ink.secondary,
      disabled: ink.muted,
    },
    divider: border.standard,
    error: {
      main: '#e53935',
    },
    success: {
      main: '#43a047',
    },
    warning: {
      main: '#f9a825',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 400,
      color: brand.dark,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 300,
      color: ink.secondary,
      letterSpacing: '-0.005em',
    },
    h6: {
      fontWeight: 500,
      color: ink.primary,
      letterSpacing: '0',
    },
    subtitle1: {
      fontWeight: 500,
      color: ink.secondary,
    },
    body2: {
      color: ink.secondary,
    },
    caption: {
      color: ink.tertiary,
      fontSize: '0.78rem',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: surface.canvas,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: surface.paper,
          color: ink.primary,
          borderBottom: `1px solid ${border.standard}`,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        outlined: {
          borderColor: border.standard,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 500,
          borderRadius: 6,
        },
        containedPrimary: {
          boxShadow: `0 1px 3px ${alpha(brand.main, 0.24)}`,
          '&:hover': {
            boxShadow: `0 3px 8px ${alpha(brand.main, 0.32)}`,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(brand.main, 0.4),
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: surface.inset,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${border.subtle}`,
          padding: '10px 16px',
        },
        head: {
          fontWeight: 600,
          fontSize: '0.8rem',
          color: ink.secondary,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.04em',
          borderBottom: `1px solid ${border.emphasis}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: surface.hover,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: surface.inset,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(brand.main, 0.4),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1.5,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          boxShadow: `0 8px 32px ${alpha('#000', 0.12)}`,
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filled: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 4,
            minWidth: 32,
            height: 32,
            fontSize: '0.85rem',
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: alpha(ink.muted, 0.12),
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.15s ease',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;
