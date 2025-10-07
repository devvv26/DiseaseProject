import { createTheme } from '@mui/material/styles';

// A premium, clean theme inspired by the MIRA DENTAL website
const theme = createTheme({
  palette: {
    primary: {
      main: '#5D7A77', // A muted, sophisticated teal/green
    },
    secondary: {
      main: '#BFA58A', // A soft beige accent color
    },
    background: {
      default: '#FDFCFB', // A very light, warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333', // A softer black for text
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Use the 'Lora' font for headings to give an elegant feel
    h4: {
      fontFamily: '"Lora", "Georgia", serif',
      fontWeight: 700,
      color: '#333333',
    },
    h5: {
      fontFamily: '"Lora", "Georgia", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Lora", "Georgia", serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px', // Pill-shaped buttons
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#4A615F', // A slightly darker shade for hover
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#5D7A77',
          },
          '&.Mui-completed': {
            color: '#5D7A77',
          },
        },
      },
    },
  },
});

export default theme;