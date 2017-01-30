'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/pages/App';
import NoteItem from './components/pages/NotePage';
import reducers from './reducers/index';


// Add the reducer to your store on the `routing` key:
const store = createStore(reducers);
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// );

// Create an enhanced history that syncs navigation events with the store:
const history = syncHistoryWithStore(browserHistory, store);

// 
const RouterConfig = () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App } />
      <Route path="notes/:noteID" component={ NoteItem } />
    </Router>
  </Provider>
);

export default RouterConfig;

// Inject router configuration into HTML insertion <div>:
ReactDOM.render(<RouterConfig />, document.getElementById('root'));
