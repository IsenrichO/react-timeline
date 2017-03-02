'use strict';
import React from 'react';
import SearchBox from './SearchBox';


const SearchSidebar = (props) => (
  <div id="sidebar">
    <i
      id="close-ic"
      onClick={ () => props.reroute('/') }>
      &larr;
    </i>
    <SearchBox />
    <div
      className="search-category category-starred"
      onClick={ () => {
        props.reroute('/search/starred');
        props.fetchStarredEvents();
      }}>
      <h4>
        Starred
        <i className="category-ic">&#x2606;</i>
      </h4>
    </div>
  </div>
);

export default SearchSidebar;
