import React from 'react';
import { isEmpty } from 'lodash';
import { getTimeDifferenceInMs } from './date-and-time';

// 
const orderTimelineEvents = (evts) => !isEmpty(evts)
  ? Object
    .values(evts)
    .sort(({ date: date1 }, { date: date2 }) => getTimeDifferenceInMs(date2, date1))
  : [];

/* EXPORTS */
export default {
  orderTimelineEvents,
};
