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
        $linkText = $evt.text().toUpperCase(),
        $block = $evt.closest('.show-more-wrapper').prev('blockquote');

  $block
    .toggleClass('hidden shown')
    .css({ height: $block.hasClass('shown') ? $block.get(0).scrollHeight : '4em' });
  setTimeout(() => {
    $evt.text(`Show ${$linkText === 'SHOW MORE' ? 'Less' : 'More'}`);
  }, 575);
};

const ShowMoreControl = (txtLen = 100) => txtLen >= 300
  ? (
    <div className="show-more-wrapper">
      <hr className="separator-fade" />
      <div className="show-more">
        <span className="bg-line" />
        <a
          href="javascript://"
          target="_self"
          rel="nofollow"
          onClick={ slider }>
          Show More
        </a>
        <span className="bg-line" />
      </div>
    </div>
  ) : null;

const TLEventBody = ({ evtDate, evtFormattedDate, evtDescription, evtLocation, photoCount }) => (
  <div className="panel-body">
    <div className="tl-description">
      <blockquote
        className={ 'hidden' + (evtDescription.length === 0 ? ' empty-summary' : '') }
        style={{ height: '4em' }}>
        { evtDescription }
      </blockquote>
      { ShowMoreControl(evtDescription.length) }
    </div>
    { evtDescription.length >= 300 ? <br /> : null }

    <div className="tl-date">
      <i className="material-icons">event</i>
      <em>{ evtFormattedDate }</em>
    </div>
    
    <div
      className="tl-location"
      onClick={ debounceToggle }>
      <i className="material-icons">place</i>
      <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
      <i className="toggle-glyph glyphicon glyphicon-menu-right" />
      <StaticGMap evtLocation={ evtLocation } />
    </div>
    
    <div
      className="tl-photos"
      onClick={ debounceToggle }>
      <i className="material-icons">collections</i>
      <em>{ photosTagLine(photoCount) }</em>
      <i className="toggle-glyph glyphicon glyphicon-menu-right" />
    </div>
  </div>
);

export default TLEventBody;
