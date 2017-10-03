'use strict';
import React from 'react';
import { Match, Route, Switch } from 'react-router-dom';

// Page-level layout component imports:
import SearchWrapper from '../components/search/SearchWrapper';
import SearchResults from '../components/search/SearchResults';

// Action creator & middleware imports:
import { fetchSeedData, fetchAllEvents, fetchRecentlyModifiedEvents, fetchStarredEvents } from '../actions/asyncActions';
import { StoreWithMiddleware as Store } from '../store/configureStore';


export default (
  <Switch>
    <Route path="/search/recent" component={ SearchResults } />
    <Route path="/search/starred" component={ SearchResults } />
    <Route path="/search" component={ SearchResults /* SearchWrapper */ } />
  </Switch>
);


  // <Route
  //   path="search"
  //   component={ SearchWrapper }
  //   onEnter={ () => Store.dispatch(fetchSeedData()) }>
  //   <IndexRoute
  //     component={ SearchResults }
  //     onEnter={ () => Store.dispatch(fetchAllEvents()) } />
  //   <Route
  //     path="recent"
  //     component={ SearchResults }
  //     onEnter={ () => Store.dispatch(fetchRecentlyModifiedEvents()) } />
  //   <Route
  //     path="starred"
  //     component={ SearchResults }
  //     onEnter={ () => Store.dispatch(fetchStarredEvents()) } />
  // </Route>
