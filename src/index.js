import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: '#000000',
    },
  },
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <App/>
  </ThemeProvider>,
  document.getElementById('root')
);
