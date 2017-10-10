import React from 'react';
import { Match, Route, Switch } from 'react-router-dom';

// Page-level layout component imports:
import App from '../components/pages/App';
import TimelineEventPage from '../components/pages/TimelineEventPage';
import SearchResults from '../components/search/SearchResults';
import SearchSidebar from '../components/search/SearchSidebar';
import SearchWrapper from '../components/search/SearchWrapper';

// Action creator & middleware imports:
import { fetchAllCloudinary } from '../state/cloudinaryImageStore';
import { fetchSeedData } from '../actions/asyncActions';

// Child route configuration imports:
import SearchSubRoutes from './SearchSubRoutes';

export default (
  <div>
    <Switch>
      <Route
        exact
        component={App}
        path="/"
      />
      <Route
        component={TimelineEventPage}
        path="/events/edit/:uuid"
      />
      <Route
        component={SearchSidebar} // SearchWrapper}
        path="/search"
        // routes={[ ]}
      />
    </Switch>
  </div>
);
// {SearchSubRoutes}

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
