import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import { Route, Switch } from 'react-router-dom';
import styler from '../style/styler';

// Page-level layout component imports:
import App from '../components/pages/App';
import TimelineEventPage from '../components/pages/TimelineEventPage';
import SearchResults from '../components/search/SearchResults';
import SearchSidebar from '../components/search/SearchSidebar';
// import SearchWrapper from '../components/search/SearchWrapper';

// Child route configuration imports:
// import SearchSubRoutes from './SearchSubRoutes';

@styler(({ colors, fonts, helpers }) => ({
  composedRoutesWrapper: {
    ...helpers.flexify('row', 'flex-start'),
    maxWidth: '100vw',
    overflow: 'hidden',
    width: '100vw',
  },
}), {
  styleName: 'RouteViewWrapperStyles',
})
export default class RouteWrapper extends Component {
  static displayName = 'RouteViewWrapper';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  render() {
    const { classNames } = this.props;

    return (
      <div>
        <Route
          exact
          component={App}
          path="/"
        />
        <Route
          component={TimelineEventPage}
          path="/events/edit/:uuid"
        />
        <div className={classNames.composedRoutesWrapper}>
          <Route
            component={SearchSidebar}
            path="/search"
          />
          <Route
            exact
            component={SearchResults}
            path="/search"
          />
        </div>
      </div>
    );
  }
}

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
