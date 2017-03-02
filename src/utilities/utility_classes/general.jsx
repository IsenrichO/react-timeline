'use strict';
import React from 'react';


// 
const addEventToFavorites = (func, evt) =>
  func({
    eventId: evt.eventId,
    uuid: evt.uuid,
    starred: !evt.starred ? true : false
  });

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
  toggleAccordionSection
};

export default GeneralUtils;
