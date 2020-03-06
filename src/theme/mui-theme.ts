import {createMuiTheme} from '@material-ui/core/styles';
import {lightBlue, lightGreen} from '@material-ui/core/colors';

// Application Theme
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu',
  },
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue['800'],
    },
    secondary: {
      main: lightGreen['800'],
    },
  },
});

export default theme;
