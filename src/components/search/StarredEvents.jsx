'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const StarredEvents = ({ starredEvents }) => (
  <ul className="evt-search-starred">
    { Utils.renderStarredEvents(starredEvents) }
  </ul>
);

export default StarredEvents;
