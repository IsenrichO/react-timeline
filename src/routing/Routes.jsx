'use strict';
import React from 'react';
import { Match, Route, Switch } from 'react-router-dom';

// Page-level layout component imports:
import App from '../components/pages/App';
import TimelineEventPage from '../components/pages/TimelineEventPage';

// Action creator & middleware imports:
import { fetchSeedData, fetchAllCloudinary } from '../actions/asyncActions';
import { StoreWithMiddleware as Store } from '../store/configureStore';

// Child route configuration imports:
import SearchSubRoutes from './SearchSubRoutes';


export default (
  <div>
  <Switch>
    <Route path="/events/edit/:uuid" component={ TimelineEventPage } />
    <Route exact path="/" component={ App }/>
  </Switch>
  { SearchSubRoutes }
  </div>
);


// <Router
//   path="/"
//   onEnter={ () => Store.dispatch(fetchSeedData()) }
//   onEnter={ fetchSeedData }>

// <IndexRoute
//   component={ App }
//   // onEnter={ () => Store.dispatch(fetchAllCloudinary()) }
//   />

// <Route
//   path="events/edit/:uuid"
//   component={ TimelineEventPage } />

// { SearchSubRoutes }
