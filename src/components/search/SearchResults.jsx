'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const SearchResults = ({ searchEvents, eventsStore, updateSingleEvent, imageData }) => (
  <ul className="evt-search-starred">
    { Utils.renderStarredEvents(searchEvents, eventsStore, updateSingleEvent, imageData) }
  </ul>
);

export default SearchResults;
