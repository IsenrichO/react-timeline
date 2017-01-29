'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import '../assets/styles/master.scss';
import Timeline from './components/Timeline';
import EditEventModal from './components/EditEventModal';
import rootReducer from './reducers/index';
import SEED_DATA from './constants/json/SeedData.json';
import reducers from '../src/reducers/index';
// import App from '../src/App';


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
      <Route path="/" component={ App }>
        <Route path="notes/:noteID" component={ NoteItem } />
      </Route>
    </Router>
  </Provider>
);
// export default RouterConfig;

const NoteItem = ({ params: { noteID } }) => (
  <h1>Note ID: { noteID }</h1>
);


const App = () => (
  <div id="tl-container">
    <Timeline
      data={ SEED_DATA} />
    <EditEventModal />
  </div>
);
export default App;


ReactDOM.render(<RouterConfig />, document.getElementById('root'));






// 'use strict';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxPromise from 'redux-promise';

// import '../assets/styles/master.scss';
// import Timeline from './components/Timeline';
// import EditEventModal from './components/EditEventModal';
// import rootReducer from './reducers/index';
// import SEED_DATA from './constants/json/SeedData.json';


// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// const App = () => (
//   <div id="tl-container">
//     <Timeline
//       data={ SEED_DATA} />
//     <EditEventModal />
//   </div>
// );

// export default App;

// Inject top-level React component into #root HTML element:
// ReactDOM.render(<App />, document.getElementById('root'));


// <Provider store={ createStoreWithMiddleware(rootReducer) }>
// </Provider>
