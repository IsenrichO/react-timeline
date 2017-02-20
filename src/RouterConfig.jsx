'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import App from './components/pages/App';
import TimelineEventPage from './components/pages/TimelineEventPage';
import { fetchSeedData } from './actions/asyncActions';
import { History, Store } from './store/configureStore';


const loadEvts = () => Store.dispatch(fetchSeedData());

// 
const RouterConfig = () => (
  <Provider store={ Store }>
    <Router history={ History }>
      <Route
        path="/"
        component={ App }
        onEnter={ loadEvts } />
      <Route
        path="events/edit/:eventId"
        component={ TimelineEventPage } />
    </Router>
  </Provider>
);

export default RouterConfig;

// Inject router configuration into HTML insertion <div>:
ReactDOM.render(
  <RouterConfig />,
  document.getElementById('root')
);
