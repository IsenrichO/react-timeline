'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { History, StoreWithMiddleware as Store } from '../store/configureStore';
import Routes from './Routes';


const RouterConfig = (
  <Provider store={ Store }>
    <Router history={ History }>{ Routes }</Router>
  </Provider>
);

export default RouterConfig;
