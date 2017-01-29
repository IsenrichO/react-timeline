'use strict';
import React, { Component } from 'react';

import TimelineEventToolbar from './TimelineEventToolbar';
import StaticGMap from './StaticMapEventLocation';


const handleToggle = function(evt) {
  const $target = $(evt.currentTarget),
        $mapWrapper = $target.find('.static-map-wrapper'),
        $toggleArrow = $target.find('.map-toggle');

  $toggleArrow.hasClass('glyphicon-menu-right')
    ? $toggleArrow.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-down')
    : $toggleArrow.removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
  $mapWrapper.toggleClass('active');
};

const TimelineEvent = ({ evt, evtName, evtLocation, evtAlign, evtDescription, evtNote, logModalData, toggleModal }) => (
  <li className={ `tl-event${evtAlign}` }>
    <div className="tl-marker">
      <i className="glyphicon glyphicon-record" />
    </div>
    <div className="tl-event-panel">
      <TimelineEventToolbar
        evt={ evt }
        logModalData={ logModalData }
        toggleModal={ toggleModal } />
      <div className="panel-header">
        <h3>{ evtName }</h3>
      </div>
      <div className="panel-body">
        { evtDescription }
        <div
          className="tl-location"
          onClick={ handleToggle }>
          <i className="glyphicon glyphicon-map-marker" />
          <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
          <i className="map-toggle glyphicon glyphicon-menu-right" />
          <StaticGMap
            evtLocation={ evtLocation } />
        </div>
      </div>
      <div className="panel-footer">{ evtNote }</div>
    </div>
  </li>
);

export default TimelineEvent;
