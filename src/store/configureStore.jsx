'use strict';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducers from '../reducers/index';


// const routerMid = routerMiddleware(browserHistory),
//       createStoreWithMiddleware = applyMiddleware(promiseMiddleware, routerMid)(createStore),
//       store = createStoreWithMiddleware(reducers),
//       history = syncHistoryWithStore(browserHistory, store);


// Add the reducer to your store on the `routing` key:
// Note: this API requires redux@>=3.1.0
  // const StoreWithMiddleware = createStore(
  //   combineReducers({
  //     ...reducers,
  //     routing: routerReducer
  //   }),
  //   applyMiddleware(ReduxThunk)
  // );


// const StoreWithMiddleware = applyMiddleware(ReduxThunk, routerMiddleware(browserHistory))(createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// ));
// const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);
const routerMid = routerMiddleware(browserHistory),
      createStoreWithMiddleware = applyMiddleware(ReduxThunk, routerMid)(createStore),
      StoreWithMiddleware = createStoreWithMiddleware(combineReducers({
        ...reducers,
        routing: routerReducer
      })),
      History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);


// Create an enhanced history that syncs navigation events with the store:
  // const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);

export { History, StoreWithMiddleware };

// var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(Redux.createStore);
// var store = createStoreWithMiddleware(rootReducer);
