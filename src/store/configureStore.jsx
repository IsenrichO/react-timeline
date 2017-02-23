'use strict';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducers from '../reducers/index';


// Add the reducer to your store on the `routing` key:
// Note: this API requires redux@>=3.1.0
const StoreWithMiddleware = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(ReduxThunk)
);

// Create an enhanced history that syncs navigation events with the store:
const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);

export { History, StoreWithMiddleware };

// var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(Redux.createStore);
// var store = createStoreWithMiddleware(rootReducer);
