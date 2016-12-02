import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { blue500, blue700, grey400, pinkA200, grey100, grey500, darkBlack, blue800 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: blue800,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
  },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>, document.getElementById('root')
);
