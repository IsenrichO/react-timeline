'use strict';
import React from 'react';
import SingleEvent from '../../components/search/SingleEvent';
import BatchSelectCheckbox from '../../components/BatchSelectCheckbox';
import { collapseBody } from './general';
import { addEventToFavorites, getStarGlyphClass, hasMultipleTags } from './general';


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
const renderStarredEvents = (evts, eventsStore, updateSingleEvent, imageStore) => evts.map((evt, index) => {
  console.log('IMAGE STORE:', imageStore);
  return (
  <SingleEvent
    evt={ evt }
    key={ `SearchEventCard_${index}` }
    addEventToFavorites={ () => addEventToFavorites(updateSingleEvent, evt) }
    getStarGlyphClass={ getStarGlyphClass(eventsStore, evt.uuid) }
    hasMultipleTags={ hasMultipleTags(eventsStore, evt.uuid) }
    imageStore={ imageStore[evt.uuid] } />
)});


const RenderingUtils = {
  renderItemActionControl,
  renderStarredEvents
};

export default RenderingUtils;
