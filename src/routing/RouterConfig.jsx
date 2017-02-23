'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { History, StoreWithMiddleware as Store } from '../store/configureStore';
import Routes from './Routes';


export default (
  <Provider store={ Store }>
    <Router history={ History }>{ Routes }</Router>
  </Provider>
);
