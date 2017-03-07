'use strict';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Page-level layout imports:
import App from '../components/pages/App';
import TimelineEventPage from '../components/pages/TimelineEventPage';

import SearchWrapper from '../components/search/SearchWrapper';
import AllEvents from '../components/search/AllEvents';
import RecentlyModifiedEvents from '../components/search/RecentlyModifiedEvents';
import StarredEvents from '../components/search/StarredEvents';

// Action creator & middleware imports:
import { fetchSeedData, fetchRecentlyModifiedEvents } from '../actions/asyncActions';
import { StoreWithMiddleware as Store } from '../store/configureStore';


export default (
  <Route
    path="/"
    onEnter={ () => Store.dispatch(fetchSeedData()) }>
    <IndexRoute component={ App } />
    <Route
      path="events/edit/:uuid"
      component={ TimelineEventPage } />
    <Route
      path="search"
      component={ SearchWrapper }
      onEnter={ () => Store.dispatch(fetchSeedData()) }>
      <IndexRoute component={ AllEvents } />
      <Route
        path="recent"
        component={ RecentlyModifiedEvents }
        // onEnter={ () => Store.dispatch(fetchRecentlyModifiedEvents()) }
        />
      <Route
        path="starred"
        component={ StarredEvents } />
    </Route>
  </Route>
);
