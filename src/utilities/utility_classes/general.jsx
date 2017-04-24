'use strict';
import React from 'react';
import { getOtherItem } from './functional';


// 
const addEventToFavorites = (func, { uuid, starred }) =>
  func({
    uuid,
    starred: !starred ? true : false
  });

// 
const collapseBody = (evt) => {
  evt.stopPropagation();
  const $targ = $(evt.target),
      $parentListItem = $targ.closest($('li[class^="tl-event"]')),
      $collapsiblePanels = $targ.parent().siblings($('[class|="panel"]')),
      isCollapsed = $($collapsiblePanels[0]).hasClass('tl-collapsed');

  $.each($collapsiblePanels, (index, $panel) => {
    isCollapsed ? $($panel).removeClass('tl-collapsed') : $($panel).addClass('tl-collapsed');
  });
  $targ.css({ transform: `scaleY(${!isCollapsed ? '-1' : '1'}` });
  $parentListItem.css({ maxHeight: !isCollapsed ? $(evt.target).parent()[0].getClientRects()[0].height : '1000px' });
};

// 
const getStarGlyphClass = (srcData, uuid) => {
  const evtIndex = srcData.findIndex(evt => evt.uuid === uuid);
  return !!~evtIndex ? srcData[evtIndex].starred : false;
};

// 
const hasMultipleTags = (srcData, uuid) => {
  const evtIndex = srcData.findIndex(evt => evt.uuid === uuid);
  return srcData[evtIndex].tags.length > 1;
};

// Controller for animation/behavior of Google Static Maps image wrapper:
const toggleAccordionSection = (evt) => {
  evt.persist();
  console.log('Event:', evt);
  const { currentTarget: currTarg, currentTarget: { lastChild: toggleGlyph }} = evt,
        $heights = [$(currTarg).parent('section').get(0).scrollHeight, 16];
  console.log('Curr Target:', currTarg);
  
  $(toggleGlyph).toggleClass('active');
  $(currTarg).parent('section').css({ height: `${getOtherItem($heights, $(currTarg).parent('section').height())}px` });
};


const GeneralUtils = {
  addEventToFavorites,
  collapseBody,
  getStarGlyphClass,
  hasMultipleTags,
  toggleAccordionSection
};

export { addEventToFavorites, collapseBody, getStarGlyphClass, hasMultipleTags, toggleAccordionSection };
export default GeneralUtils;
