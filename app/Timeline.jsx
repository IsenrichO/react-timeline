'use strict';
import React, { Component } from 'react';

import TimelineEvent from './TimelineEvent';


const OrderedEvents = (events) => events
  .sort((evt1, evt2) => new Date(evt2.date).getTime() - new Date(evt1.date).getTime());

const mapEvents = (events) => events.map((evt, index) =>
  <TimelineEvent
    key={ `Evt${evt.name}${index}` }
    evtName={ evt.name }
    evtLocation={ evt.location }
    evtAlign={ new Array('', '-invert')[index % 2] }
    evtDescription={ evt.description }
    evtNote={ evt.type } />
);

const Timeline = ({ data }) => (
  <ul className="tl">{ mapEvents(OrderedEvents(data)) }</ul>
);

export default Timeline;
