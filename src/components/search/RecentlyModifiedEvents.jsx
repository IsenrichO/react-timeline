'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const RecentlyModifiedEvents = ({ starredEvents }) => (
  <ul className="evt-search-recent">
    { Utils.renderStarredEvents(starredEvents) }
  </ul>
);

export default RecentlyModifiedEvents;
