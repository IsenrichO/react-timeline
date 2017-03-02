'use strict';
import React from 'react';


// 
const addEventToFavorites = (func, evt) =>
  func({
    eventId: evt.eventId,
    uuid: evt.uuid,
    starred: !evt.starred ? true : false
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
  return srcData[evtIndex].starred || null;
};

// 
const hasMultipleTags = (srcData, uuid) => {
  const evtIndex = srcData.findIndex(evt => evt.uuid === uuid);
  return srcData[evtIndex].tags.length > 1;
};

// Controller for animation/behavior of Google Static Maps image wrapper:
const toggleAccordionSection = (evt) => {
  const $target = $(evt.currentTarget),
        [$mapWrapper, $toggleArrow] = [$('.static-map-wrapper', $target), $('.toggle-glyph', $target)];

  $.each([$toggleArrow, $mapWrapper], (index, el) => {
    el.toggleClass('active');
  });
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
