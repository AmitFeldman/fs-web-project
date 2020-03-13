import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AuthProvider} from './context/AuthContext';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme/mui-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {initArticles} from './utils/news-api';
import {AlertProvider} from './context/AlertContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AlertProvider>
            <App />
          </AlertProvider>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

// Init news api
initArticles();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
