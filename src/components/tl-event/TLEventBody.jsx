'use strict';
import React from 'react';
// import { debounce } from 'lodash';
import StaticGMap from '../StaticMapEventLocation';
import { formatDate } from '../../utilities/index';
import { toggleAccordionSection } from '../../utilities/utility_classes/general';


// Returns a function, that, as long as it continues to be invoked, will not
//  be triggered. The function will be called after it stops being called for
//  N milliseconds. If `immediate` is passed, trigger the function on the
//  leading edge, instead of the trailing.
const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const [context, args] = [this, arguments],
          later = () => {
            timeout = null;
            if (!immediate) { func.apply(context, args); }
          },
          callNow = (immediate && !timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
  };
};

const debounceToggle = (evt) => debounce(toggleAccordionSection, 200, true)(evt),
      photosTagLine = (numPhotos) => `${numPhotos} Photo${numPhotos !== 1 ? 's' : ''}`;

const slider = (evt) => {
  const $evt = $(evt.currentTarget),
        $block = $evt.prev('blockquote');

  $block.hasClass('hide-more')
    ? $block
        .toggleClass('hide-more show-more')
        .css({ height: $block.get(0).scrollHeight })
    : $block
        .toggleClass('hide-more show-more')
        .css({ height: '4em' });
};


const TLEventBody = ({ evtDate, evtFormattedDate, evtDescription, evtLocation, photoCount }) => {
  return (
  <div className="panel-body">
    <blockquote
      className={ 'hide-more' + (evtDescription.length === 0 ? ' empty-summary' : '') }
      style={{ height: '4em' }}>
      { evtDescription }
    </blockquote>
    <span onClick={ slider }>Show More</span>
    <div className="tl-date">
      <i className="glyphicon glyphicon-calendar" />
      <em>{ evtFormattedDate }</em>
    </div>
    <div
      className="tl-location"
      onClick={ debounceToggle }>
      <i className="glyphicon glyphicon-map-marker" />
      <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
      <i className="toggle-glyph glyphicon glyphicon-menu-right" />
      <StaticGMap evtLocation={ evtLocation } />
    </div>
    <div
      className="tl-photos"
      onClick={ debounceToggle }>
      <i className="glyphicon glyphicon-picture" />
      <em>{ photosTagLine(photoCount) }</em>
      <i className="toggle-glyph glyphicon glyphicon-menu-right" />
    </div>
  </div>
);}

export default TLEventBody;
