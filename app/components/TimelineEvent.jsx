'use strict';
import React, { Component } from 'react';

import TimelineEventToolbar from './TimelineEventToolbar';


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
        <div className="tl-location">
          <i className="glyphicon glyphicon-map-marker" />
          <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
        </div>
      </div>
      <div className="panel-footer">{ evtNote }</div>
    </div>
  </li>
);

export default TimelineEvent;
