'use strict';
import React, { Component } from 'react';


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
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

// Usage
// var myEfficientFn = debounce(function() {
  // All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', myEfficientFn);

export { debounce };


const toggleAccordionSection = function(evt) {
  const $target = $(evt.currentTarget),
        $mapWrapper = $target.find('.static-map-wrapper'),
        $toggleArrow = $target.find('.map-toggle');

  $toggleArrow.toggleClass('active');
  $mapWrapper.toggleClass('active');
};

export { toggleAccordionSection };
