'use strict';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Page-level layout component imports:
import AllEvents from '../components/search/AllEvents';
import SearchWrapper from '../components/search/SearchWrapper';
import RecentlyModifiedEvents from '../components/search/RecentlyModifiedEvents';
import StarredEvents from '../components/search/StarredEvents';

// Action creator & middleware imports:
import { fetchSeedData, fetchRecentlyModifiedEvents, fetchStarredEvents } from '../actions/asyncActions';
import { StoreWithMiddleware as Store } from '../store/configureStore';


export default (
  <Route
    path="search"
    component={ SearchWrapper }
    onEnter={ () => Store.dispatch(fetchSeedData()) }>
    <IndexRoute component={ AllEvents } />
    <Route
      path="recent"
      component={ RecentlyModifiedEvents }
      onEnter={ () => Store.dispatch(fetchRecentlyModifiedEvents()) } />
    <Route
      path="starred"
      component={ StarredEvents }
      onEnter={ () => Store.dispatch(fetchStarredEvents()) } />
  </Route>
);
