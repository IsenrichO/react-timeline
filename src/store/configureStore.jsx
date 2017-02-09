'use strict';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from '../reducers/index';



// Add the reducer to your store on the `routing` key:
// Note: this API requires redux@>=3.1.0
const Store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// );

// Create an enhanced history that syncs navigation events with the store:
const History = syncHistoryWithStore(browserHistory, Store);


export { History, Store };

// var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(Redux.createStore);
// var store = createStoreWithMiddleware(rootReducer);
