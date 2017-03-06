'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const RecentlyModifiedEvents = ({ recentEvents, fetchRecentlyModifiedEvents }) => {
  console.log('recent view being shown', recentEvents);
  fetchRecentlyModifiedEvents();
  return (
    <ul className="evt-search-recent">
      { Utils.renderStarredEvents(recentEvents) }
    </ul>
  );
};

export default RecentlyModifiedEvents;
