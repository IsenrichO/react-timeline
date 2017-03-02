'use strict';
import React from 'react';


//
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
],
monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const formatDate = (date) => {
  let dateStr = date
    .replace(/T.+Z/, '')
    .split('-');
  [...dateStr] = [dateStr[2], monthNames[+dateStr[1]], dateStr[0]];
  return dateStr.join(' ');
};

const getDateAsTimeInMs = (date) => new Date(date).getTime();
const getTimeDifferenceInMs = (date1, date2) =>
  new Date(date1).getTime() - new Date(date2).getTime();


const DateAndTimeUtils = {
  constants: [dayNames, monthNames],
  formatDate,
  getDateAsTimeInMs,
  getTimeDifferenceInMs
};

export { dayNames, monthNames };
export { formatDate, getDateAsTimeInMs, getTimeDifferenceInMs };

export default DateAndTimeUtils;
