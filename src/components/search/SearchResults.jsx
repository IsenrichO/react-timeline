'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const SearchResults = ({ searchEvents, eventsStore, updateSingleEvent }) => (
  <ul className="evt-search-starred">
    { Utils.renderStarredEvents(searchEvents, eventsStore, updateSingleEvent) }
  </ul>
);

export default SearchResults;
