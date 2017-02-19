'use strict';
import React from 'react';


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

export { debounce };

// Controller for animation/behavior of Google Static Maps image wrapper:
const toggleAccordionSection = (evt) => {
  const $target = $(evt.currentTarget),
        [$mapWrapper, $toggleArrow] = [$('.static-map-wrapper', $target), $('.toggle-glyph', $target)];

  $.each([$toggleArrow, $mapWrapper], (index, el) => {
    el.toggleClass('active');
  });
};

export { toggleAccordionSection };


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

export { dayNames, monthNames, formatDate, getDateAsTimeInMs, getTimeDifferenceInMs };
