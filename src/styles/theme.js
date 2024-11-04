import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0F0D29', // Darkened the main color
      dark: '#1D1753', // Darkened the dark shade
      light: '#2A2675', // Darkened the light shade
    },
    secondary: {
      main: '#D6C0E6', // Lightened the secondary color slightly
    },
    background: {
      default: '#0F0D29', // Darkened the default background
      paper: '#1D1753', // Darkened the paper background
    },
    text: {
      primary: '#FFFFFF', // Ensure the text is lighter (white)
      secondary: '#E0E0E0', // Use a lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Exo 2", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      color: '#FFFFFF', // Lightened the heading fonts
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      color: '#FFFFFF',
    },
    h3: {
      fontFamily: '"Orbitron", sans-serif',
      color: '#FFFFFF',
    },
    h4: {
      fontFamily: '"Orbitron", sans-serif',
      color: '#FFFFFF',
    },
    body1: {
      color: '#E0E0E0', // Lighter color for body text
    },
    body2: {
      color: '#E0E0E0',
    },
  },
});
