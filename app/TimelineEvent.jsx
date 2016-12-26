'use strict';
import React, { Component } from 'react';


const TimelineEvent = ({ evtName, evtLocation, evtAlign, evtDescription, evtNote }) => (
  <li className={ `tl-event${evtAlign}` }>
    <div className="tl-marker">
      <i className="glyphicon glyphicon-record" />
    </div>
    <div className="tl-event-panel">
      <div className="panel-header">
        <h3>{ evtName }</h3>
      </div>
      <div className="panel-body">
        { evtDescription }
        <div>
          <i className="glyphicon glyphicon-map-marker" />
          <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
        </div>
      </div>
      <div className="panel-footer">{ evtNote }</div>
    </div>
  </li>
);

export default TimelineEvent;
