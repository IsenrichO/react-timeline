import React from 'react';
import { Match, Route, Switch } from 'react-router-dom';

// Page-level layout component imports:
import SearchSidebar from '../components/search/SearchSidebar';
import SearchWrapper from '../components/search/SearchWrapper';
import SearchResults from '../components/search/SearchResults';

// Action creator & middleware imports:
import { fetchSeedData, fetchAllEvents } from '../actions/asyncActions';
import { fetchRecentlyModifiedEvents, fetchStarredEvents } from '../state/searchEvents';

const Doasd = () => <h2>SHIT YOOOOOOOOO</h2>;


// {
//   <Route
//     component={SearchResults}
//     path="/search/recent"
//   />
// }
export default (
  <Switch>
    <Route
      exact
      component={SearchResults} // SearchWrapper
      path="/search"
    />
    <Route
      component={SearchSidebar} // SearchResults
      path="/search"
      // routes={[{
      //   component: SearchResults,
      //   path: '/search/starred',
      // }, {
      //   component: Doasd,
      //   path: '/search/recent',
      // }]}
    />
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
