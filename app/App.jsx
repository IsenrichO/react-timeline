'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import '../assets/styles/master.scss';
import Timeline from './components/Timeline';
import EditEventModal from './components/EditEventModal';
import rootReducer from './reducers/index';
import SEED_DATA from './constants/json/SeedData.json';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const App = () => (
  <Provider store={ createStoreWithMiddleware(rootReducer) }>
  <div id="tl-container">
    <Timeline
      data={ SEED_DATA} />
    <EditEventModal />
  </div>
  </Provider>
);

// Inject top-level React component into #root HTML element:
ReactDOM.render(<App />, document.getElementById('root'));
