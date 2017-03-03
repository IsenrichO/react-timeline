'use strict';
import React from 'react';
import StaticGMap from '../StaticMapEventLocation';
import { debounce, formatDate, toggleAccordionSection } from '../../utilities/index';


const debounceToggle = (evt) => debounce(toggleAccordionSection(evt), 2000, true),
      photosTagLine = (numPhotos) => `${numPhotos} Photo${numPhotos !== 1 ? 's' : ''}`;

const TLEventBody = ({ evtDate, evtFormattedDate, evtDescription, evtLocation, photoCount }) => (
  <div className="panel-body">
    <blockquote>{ evtDescription }</blockquote>
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
);

export default TLEventBody;
