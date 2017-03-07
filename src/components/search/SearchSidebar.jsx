'use strict';
import React from 'react';
import SearchBox from './SearchBox';
import RangeSlider from '../partials/RangeSlider';


const subRoutes = [
  {
    routeName: 'All Events',
    routePath: '/search',
    routeCategory: 'all',
    childRoute: '',
    glyphClass: 'calendar',
    glyph: null,
    clickHandler: (props) => {
      props.reroute('/search');
    },
    callbackFunc: (props) => null
  }, {
    routeName: 'Starred Events',
    routePath: '/search/starred',
    routeCategory: 'starred',
    childRoute: '/starred',
    glyphClass: 'star-empty',
    glyphClassAlt: 'category-ic',
    glyph: '&#x2606;',
    clickHandler: (props) => {
      props.reroute('/search/starred');
    },
    callbackFunc: (props) => props.fetchStarredEvents()
  }, {
    routeName: 'Recently Modified',
    routePath: '/search/recent',
    routeCategory: 'recently-modified',
    childRoute: '/recent',
    glyphClass: 'time',
    glyph: null,
    clickHandler: (props) => {
      props.reroute('/search/recent');
    },
    callbackFunc: (props) => null
  }
];

const renderSearchSubRoutes = (routesArr, props) => routesArr.map((route, index) => (
  <li
    key={ `SubRouteCategory_${index}` }
    className={ `search-category category-${route.routeCategory}${window.location.pathname === route.routePath ? ' active' : ''}` }
    onClick={ () => route.clickHandler(props) }>
    <h4>
      {[
        route.routeName,
        <i
          key={ `SearchSubRouteGlyphicon_${route.glyphClass}` }
          className={ `glyphicon glyphicon-${route.glyphClass}` } />
      ]}
    </h4>
  </li>
));

const SearchSidebar = (props) => (
  <div id="sidebar">
    <i
      id="close-ic"
      onClick={ () => props.reroute('/') }>
      &larr;
    </i>
    <SearchBox />
    <nav>
      <ul>
        { renderSearchSubRoutes(subRoutes, props) }
        <li className="search-category filter-range">
          <h4>Filter By Range</h4>
          <RangeSlider />
        </li>
      </ul>
    </nav>
  </div>
);

export default SearchSidebar;
