'use strict';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Page-level layout component imports:
import App from '../components/pages/App';
import TimelineEventPage from '../components/pages/TimelineEventPage';

// Action creator & middleware imports:
import { fetchSeedData } from '../actions/asyncActions';
import { StoreWithMiddleware as Store } from '../store/configureStore';

// Child route configuration imports:
import SearchSubRoutes from './SearchSubRoutes';


export default (
  <Route
    path="/"
    onEnter={ () => Store.dispatch(fetchSeedData()) }>
    <IndexRoute component={ App } />
    <Route
      path="events/edit/:uuid"
      component={ TimelineEventPage } />
    { SearchSubRoutes }
  </Route>
);
