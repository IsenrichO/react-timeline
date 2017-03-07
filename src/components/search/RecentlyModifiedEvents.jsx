'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const RecentlyModifiedEvents = ({ searchEvents }) => (
  <ul className="evt-search-recent">
    { Utils.renderStarredEvents(searchEvents) }
  </ul>
);

export default RecentlyModifiedEvents;
