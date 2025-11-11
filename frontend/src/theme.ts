import { createTheme } from '@mui/material/styles';

// A professional, modern light theme for a health application.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00796b', // A trustworthy, calming teal/green.
      light: '#48a999',
      dark: '#004c40',
    },
    secondary: {
      main: '#d32f2f', // A strong red for alerts or important secondary actions.
    },
    background: {
      default: '#f7f9fc', // A very light, clean grey for page backgrounds.
      paper: '#ffffff',   // Pure white for cards and surfaces.
    },
    text: {
      primary: '#212121',   // Dark grey for primary text for better readability.
      secondary: '#757575', // Lighter grey for secondary text.
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Softer, more modern pill-shaped buttons.
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Consistent rounded corners for all paper elements.
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
          backdropFilter: 'blur(10px)', // Frosted glass effect
          boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;