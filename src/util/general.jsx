import React from 'react';
import { findDOMNode } from 'react-dom';
import { isPlainObject } from 'lodash';
import { getOtherItem } from './functional';

//
export const addEventToFavorites = (func, { uuid, starred, ...rest }) => func({
  starred: !starred,
  uuid,
});

//
export const collapseBody = (evt) => {
  evt.stopPropagation();

  const $targ = $(evt.target);
  const $parentListItem = $targ.closest($('li[class^="tl-event"]'));
  const $collapsiblePanels = $targ.parent().siblings($('[class|="panel"]'));
  const isCollapsed = $($collapsiblePanels[0]).hasClass('tl-collapsed');

  $.each($collapsiblePanels, (index, $panel) => {
    isCollapsed ? $($panel).removeClass('tl-collapsed') : $($panel).addClass('tl-collapsed');
  });

  $targ.css({ transform: `scaleY(${!isCollapsed ? '-1' : '1'}` });
  $parentListItem.css({ maxHeight: !isCollapsed ? $(evt.target).parent()[0].getClientRects()[0].height : '1000px' });
};

//
export const checkIfStarredEvent = function(srcData = [], uuid) {
  // If called with a single argument that is a POJO, return the value of its `starred` property:
  if (isPlainObject(srcData) && arguments.length === 1) return srcData.starred;

  // Else find the relevant event based on the passed `uuid` and return its `starred` property:
  const evtIndex = srcData.findIndex(({ uuid: evtUuid }) => evtUuid === uuid);
  return !!~evtIndex ? srcData[evtIndex].starred : false;
};

//
export const hasMultipleTags = (srcData, uuid) => srcData[uuid.toLowerCase()].tags.length > 1;

//
export const hexToRgba = (hexCode = '#FFF', alpha = 1.0) => {
  let c;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexCode)) {
    c = hexCode.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }

    c = `0x${c.join('')}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, (c & 255)].join(', ')}, ${+alpha})`;
  }

  throw new Error(`Invalid hex color code of '${hexCode}' provided!`);
};

// Controller for animation/behavior of Google Static Maps image wrapper:
export const toggleAccordionSection = (classNames, ref) => (evt) => {
  evt.persist();
  const evtTarget = evt.target;
  const accordionContainer = evt.currentTarget; // .parentNode;

  if (!!evtTarget
    && !!evtTarget.parentNode
    && !evtTarget.classList.contains(classNames.accordionContainer)
    && !evtTarget.parentNode.classList.contains(classNames.accordionContainer)
  ) return evt.stopPropagation();

  const openAndClosedHeights = [accordionContainer.scrollHeight, 35];
  const currHeight = Math.round(Number.parseInt(window.getComputedStyle(accordionContainer).height, 10));
  const toggleIcon = findDOMNode(ref || this);

  accordionContainer.style.height = `${getOtherItem(openAndClosedHeights, currHeight)}px`;
  toggleIcon.style.transform = `rotateZ(${currHeight === 35 ? 90 : 0}deg)`;
};

/* COMPILED DEFAULT EXPORT */
export default {
  addEventToFavorites,
  checkIfStarredEvent,
  collapseBody,
  hasMultipleTags,
  hexToRgba,
  toggleAccordionSection,
};
