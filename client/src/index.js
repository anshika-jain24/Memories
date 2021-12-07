import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

import App from './App';
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });

const store= createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));