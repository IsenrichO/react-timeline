'use strict';
import React from 'react';
// import { debounce } from 'lodash';
import StaticGMap from '../StaticMapEventLocation';
import ImageReel from '../ImageReel';
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

// const debounceToggle = (evt) => debounce(toggleAccordionSection, 200, true)(evt),
const debounceToggle = function(evt) { return debounce(toggleAccordionSection, 200, true)(evt); },
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

const TLEventBody = (props) => {
  let { evt, evtDate, evtFormattedDate, evtDescription, evtLocation, photoCount, imageData, cloudinaryImageStore } = props;
  console.log('TLEVENTBODY images:', cloudinaryImageStore);
return (
  <div className="panel-body">
    <section className="tl-description">
      <blockquote
        className={ 'hidden' + (evtDescription.length === 0 ? ' empty-summary' : '') }
        style={{ height: '4em' }}>
        { evtDescription }
      </blockquote>
      { ShowMoreControl(evtDescription.length) }
    </section>
    { evtDescription.length >= 300 ? <br /> : null }

    <section className="tl-date">
      <i className="material-icons">event</i>
      <em>{ evtFormattedDate }</em>
    </section>
    
    <section className="tl-location">
      <div
        className="tl-row-summary"
        onClick={ debounceToggle }>
        <i className="material-icons">place</i>
        <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
        <i className="material-icons toggle-glyph">keyboard_arrow_right</i>
      </div>
      <StaticGMap evtLocation={ evtLocation } />
    </section>
    
    <section className="tl-photos">
      <div
        className="tl-row-summary"
        onClick={ debounceToggle }>
        <i className="material-icons">collections</i>
        <em>{ photosTagLine((cloudinaryImageStore && cloudinaryImageStore.length) || 0) }</em>
        <i className="material-icons toggle-glyph">keyboard_arrow_right</i>
      </div>
      <ImageReel
        { ...props }
        cloudinaryImageStore={ cloudinaryImageStore }
        getMyImgs={ props.getMyImgs } />
    </section>
  </div>
);
};

export default TLEventBody;
