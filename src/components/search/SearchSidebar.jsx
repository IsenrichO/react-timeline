'use strict';
import React from 'react';
import SearchBox from './SearchBox';
import RangeSlider from '../partials/RangeSlider';


const subRoutes = [
  {
    routeName: 'All Events',
    routePath: '/search',
    routeCategory: 'all',
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
    glyphClass: 'star-empty',
    glyphClassAlt: 'category-ic',
    glyph: '&#x2606;',
    clickHandler: (props) => {
      props.reroute('/search/starred');
      props.fetchStarredEvents();
    },
    callbackFunc: (props) => props.fetchStarredEvents()
  }, {
    routeName: 'Recently Modified',
    routePath: '/search/recent',
    routeCategory: 'recently-modified',
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
    className={ `search-category category-${route.routeCategory}` }
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
))

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

        <li
          className="search-category filter-range"
          // onClick={ () => {
          //   console.log('filtering by range...');
          // }}
          >
          <h4>Filter By Range</h4>
          <RangeSlider />
        </li>
      </ul>
    </nav>
  </div>
);

export default SearchSidebar;


// <div
//   className="search-category category-starred"
//   onClick={ () => {
//     props.reroute('/search/starred');
//     props.fetchStarredEvents();
//   }}>
//   <h4>
//     Starred
//     <i className="category-ic">&#x2606;</i>
//   </h4>
// </div>
// <div
//   className="search-category category-recently-modified"
//   onClick={ () => {
//     props.reroute('/search/recent');
//   }}>
//   <h4>
//     Recent
//     <i className="glyphicon glyphicon-time" />
//   </h4>
// </div>
