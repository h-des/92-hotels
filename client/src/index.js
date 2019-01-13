import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';
import { unregister } from './registerServiceWorker';
import axios from 'axios';
import Root from './Root';

if (process.env.NODE_ENV !== 'production') {
  window.axios = axios;
}

injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    height: 100vh;

    @media only screen and (min-width:  1930px) {
      font-size: 112.5%;
    }

    @media only screen and (min-width:  2570px) {
      font-size: 125%;
    }
    
    @media only screen and (max-width: 425px) {
      font-size: 50%;
      
    } 
  }


  body {
    height: 100vh;
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    background-color: #f9f9f9;
  }

`;

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
unregister();
