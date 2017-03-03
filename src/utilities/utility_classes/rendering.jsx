'use strict';
import React from 'react';
import SingleEvent from '../../components/search/SingleEvent';
import BatchSelectCheckbox from '../../components/BatchSelectCheckbox';
import { collapseBody } from './general';


// 
const renderItemActionControl = (bool, evtUuid, func) => bool
  ? (
    <BatchSelectCheckbox
      evtUuid={ evtUuid }
      addSelectionToBatch={ func } />
  ) : (
    <i 
      className="collapse-up glyphicon glyphicon-chevron-up"
      onClick={ collapseBody } />    
  );

// 
const renderStarredEvents = (evts) => evts.map((evt, index) => (
  <SingleEvent
    { ...evt }
    key={ `StarredEventCard_${index}` } />
));



const RenderingUtils = {
  renderItemActionControl,
  renderStarredEvents
};

export default RenderingUtils;
