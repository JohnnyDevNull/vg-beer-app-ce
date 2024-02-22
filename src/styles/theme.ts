import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export { theme };
