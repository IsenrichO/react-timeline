'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const StarredEvents = ({ searchEvents }) => (
  <ul className="evt-search-starred">
    { Utils.renderStarredEvents(searchEvents) }
  </ul>
);

export default StarredEvents;
