import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  spacing: 8,
  palette: {

    secondary: {
      light: '',
      main: 'rgb(104,202,176)',
      dark: '',
      contrastText: '',
    },
    grey: {
      main: 'rgb(128, 128, 128)'
    },
    brand: {
      main: '#3f51b5',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: 'rgb(255, 255, 255)',
    },
    text: {
      primary: '#333',
      secondary: '#555',  
    },
  },
  border: {
    main: '0.5px, solid, rgba(0, 0, 0, 0.12)',
  },
  shape: {
    borderRadius: 4,
  },
});

const theme = createTheme({
  ...baseTheme,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        outlined: {
          color: 'white',
          background: 'transparent',
        },
        root: {
          color: 'white',
          background: baseTheme.palette.secondary.main,
          width: '120px',
          margin: '8px 0',
          boxShadow: 'none',
        },
        '&.MuiButton-contained': {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
      },
      styleOverrides: {
        root: {
        },
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.Mui-error': {
          color: 'error.main',
          margin: '8px',
        },
      },
    },
  },
});

const AppThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;
