import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './resources/fonts/fonts.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from './utils/themes';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {Web3Provider, Web3Updater} from './web3/context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Web3Provider>
          <App />
          <Web3Updater />
        </Web3Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
