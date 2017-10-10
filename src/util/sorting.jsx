import React from 'react';
import { getTimeDifferenceInMs } from './date-and-time';

// 
const orderTimelineEvents = (evts) => evts && evts.length
  ? evts.sort((evt1, evt2) => getTimeDifferenceInMs(evt2.date, evt1.date))
  : [];

/* EXPORTS */
export default {
  orderTimelineEvents,
};
