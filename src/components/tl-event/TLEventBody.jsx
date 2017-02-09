'use strict';
import React from 'react';

import StaticGMap from '../StaticMapEventLocation';
import { debounce, toggleAccordionSection } from '../../Utilities';


const debounceToggle = (evt) => debounce(toggleAccordionSection(evt), 2000, true);

const TLEventBody = ({ evtDescription, evtLocation }) => (
  <div className="panel-body">
    { evtDescription }
    <div
      className="tl-location"
      onClick={ debounceToggle }>
      <i className="glyphicon glyphicon-map-marker" />
      <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
      <i className="map-toggle glyphicon glyphicon-menu-right" />
      <StaticGMap
        evtLocation={ evtLocation } />
    </div>
  </div>
);

export default TLEventBody;
