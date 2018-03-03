import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import { Route, Switch }      from 'react-router-dom';
import styler                 from '@styles/styler';

// Page-level layout component imports:
import App                    from '@components/views/App';
import TimelineEventPage      from '@containers/EventPage';
import SearchResults          from '@components/search/SearchResults';
import SearchSidebar          from '@components/search/SearchSidebar';
import SearchMap              from '@components/search/SearchMap';
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
    classNames: ClassNamesPropType,
    theme: PropTypes.string,
  };

  static defaultProps = {
    classNames: {},
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
          exact
          component={TimelineEventPage}
          path="/events/edit/:uuid"
        />
        <div className={classNames.composedRoutesWrapper}>
          <Route
            key={location.key}
            component={SearchSidebar}
            location={location}
            path="/search"
          />
          <Switch>
            <Route
              exact
              key={location.key}
              component={SearchMap}
              path="/search/map"
            />
            <Route
              key={location.key}
              component={SearchResults}
              location={location}
              path="/search/:filter?"
            />
          </Switch>
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
