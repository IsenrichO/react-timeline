import React from 'react';
import SearchBox from './SearchBox';
import RangeSlider from '../partials/RangeSlider';

const subRoutes = [{
  accordion: false,
  callbackFunc(props) { return null; },
  childRoute: '',
  clickHandler(props) { return props.reroute('/search'); },
  glyph: null,
  glyphClass: 'calendar',
  routeCategory: 'all',
  routeName: 'All Events',
  routePath: '/search',
}, {
  accordion: false,
  callbackFunc(props) { return props.fetchStarredEvents(); },
  childRoute: '/starred',
  clickHandler(props) { return props.reroute('/search/starred'); },
  glyph: '&#x2606;',
  glyphClass: 'star-empty',
  glyphClassAlt: 'category-ic',
  routeCategory: 'starred',
  routeName: 'Starred Events',
  routePath: '/search/starred',
}, {
  accordion: true,
  callbackFunc: (props) => null,
  childRoute: '/recent',
  clickHandler(props) { return props.reroute('/search/recent'); },
  glyph: null,
  glyphClass: 'time',
  routeCategory: 'recently-modified',
  routeName: 'Recent',
  routePath: '/search/recent',
}];

const renderSearchSubRoutes = (routesArr, props) => routesArr.map((route, index) => (
  <li
    key={`SubRouteCategory_${index}`}
    className={`search-category category-${route.routeCategory}${window.location.pathname === route.routePath ? ' active' : ''}`}
    onClick={() => route.clickHandler(props)}
  >
    <h4 className={route.accordion ? 'accordion' : null}>
      {[
        <i
          key={`SearchSubRouteGlyphicon_${route.glyphClass}`}
          className={`glyphicon glyphicon-${route.glyphClass}`}
        />,
        route.routeName,
      ]}
    </h4>
  </li>
));

renderSearchSubRoutes.displayName = 'SearchSubRoutes';

renderSearchSubRoutes.propTypes = {};

renderSearchSubRoutes.defaultProps = {};

export { renderSearchSubRoutes };


//
const SearchSidebar = (props) => (
  <div id="sidebar">
    <i
      id="close-ic"
      onClick={() => props.reroute('/')}
    >
      &larr;
    </i>
    <SearchBox />
    <nav>
      <ul>
        {renderSearchSubRoutes(subRoutes, props)}
        <li className="search-category filter-range">
          <h4>
            {[
              <i
                key="SearchSubRouteGlyphicon_filter"
                className="glyphicon glyphicon-filter"
              />,
              'Filter By Range',
            ]}
          </h4>
          <RangeSlider />
        </li>
      </ul>
    </nav>
  </div>
);

SearchSidebar.displayName = 'SearchSideBar';

export default SearchSidebar;
