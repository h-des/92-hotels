import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { injectGlobal } from 'styled-components';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

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
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
