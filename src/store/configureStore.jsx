import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Route } from 'react-router-dom';  // browserHistory
import reducers from '../state';


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

const middlewares = [ReduxThunk]; // routerMiddleware(browserHistory)
const StoreWithMiddleware = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares)),
);


// const routerMid = routerMiddleware(browserHistory),
//       composeEnhancers = composeWithDevTools({ realtime: true, port: process.env.PORT || 3000 }),
//       createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxThunk, routerMid)(createStore),
//       StoreWithMiddleware = createStoreWithMiddleware(combineReducers({
//         ...reducers,
//         routing: routerReducer
//       })),


// const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);


// Create an enhanced history that syncs navigation events with the store:
  // const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);

export { StoreWithMiddleware }; // History

// var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(Redux.createStore);
// var store = createStoreWithMiddleware(rootReducer);
