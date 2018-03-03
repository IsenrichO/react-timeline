import thunk                                             from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { routerMiddleware, routerReducer }               from 'react-router-redux';
import createHistory                                     from 'history/createBrowserHistory';
import { composeWithDevTools }                           from 'redux-devtools-extension/logOnlyInProduction';
import reducers                                          from '../state';


// Build the appropriate navigation history — in this case a `BrowserHistory`:
export const history = createHistory({
  basename: '',         // The base (i.e., "canonical") URL of the application
  forceRefresh: false,  // Setting to `true` forces full-page refreshes
  keyLength: 6,         // The length of the `location.key` property
});

// Erect the middleware for dispatching and intercepting navigation actions:
export const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key & apply the middleware for navigation:
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, middleware)),
);

// Now you can dispatch navigation actions from anywhere!
// For example: `store.dispatch(push('/foo'));`

export default store;

// =================================================================================================
// =================================================================================================


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
//   applyMiddleware(thunk)
// );


// const StoreWithMiddleware = applyMiddleware(thunk, routerMiddleware(browserHistory))(createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// ));
// const History = syncHistoryWithStore(browserHistory, StoreWithMiddleware);

const middlewares = [thunk]; // routerMiddleware(browserHistory)
const StoreWithMiddleware = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares)),
);


// const routerMid = routerMiddleware(browserHistory),
//       composeEnhancers = composeWithDevTools({ realtime: true, port: process.env.PORT || 3000 }),
//       createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk, routerMid)(createStore),
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
