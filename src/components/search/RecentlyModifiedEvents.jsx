'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const RecentlyModifiedEvents = ({ searchEvents, eventsStore, updateSingleEvent }) => (
  <ul className="evt-search-recent">
    { Utils.renderStarredEvents(searchEvents, eventsStore, updateSingleEvent) }
  </ul>
);

export default RecentlyModifiedEvents;
