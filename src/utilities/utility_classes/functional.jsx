'use strict';
import React from 'react';


// True Constants:
const ALPH = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];


// 
export const getOtherItem = (list = [], entry) => list.find(item => item !== entry);

// Returns a function, that, as long as it continues to be invoked, will not
//  be triggered. The function will be called after it stops being called for
//  N milliseconds. If `immediate` is passed, trigger the function on the
//  leading edge, instead of the trailing.
export const debounce = (func, wait, immediate) => {
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

// 
const getRange = function(start = 0, stop, step = 1, inclusive = false) {
  const outputRange = (rangeLen, mapFunc) => Array.from(rangeLen, mapFunc),
        regCharSet = new RegExp('[A-Z]', 'i');
  let rangeLen, mapFunc, isDescending = false;

  if (typeof start !== 'number' && typeof start !== 'string') {
    throw new Error(`Invalid input <${start}> of type <${typeof start}> provided. The` +
                    `\`getRange()\` function accepts either Number or String type inputs.`);
  }

  // Return empty Array literal when called without providing any input(s):
  if (arguments.length === 0) { return new Array(0); }

  if (typeof start === 'string' && regCharSet.test(start) && start.length === 1) {
    // Test that `start` parameter (if not default value) is a valid, single-unit
    //  alphabetic character:
    if (stop !== 0 && typeof stop === 'string') {
      if (start > stop) { isDescending = true; }
      let endChar,
          startChar = start.toUpperCase();

      if (!regCharSet.test(stop) || stop.length !== 1) {
        throw new Error(`Invalid input: ${start}\nShould be an alphabetic character.`);
      } else {
        endChar = stop.toUpperCase();
        const startIndex = ALPH.indexOf(startChar);
        rangeLen = Math.abs(ALPH.indexOf(endChar) - startIndex + (!!inclusive ? 1 : 0));
        mapFunc = (_, i) => (isDescending ? ALPH[startIndex - (i * step)] : ALPH[startIndex + (i * step)]);
      }
    } else {
      rangeLen = ALPH.indexOf(!!inclusive ? (start + 1) : start);
      mapFunc = (_, index) => ALPH[index];
    }
  }

  if (typeof start === 'number') {
    if (stop !== undefined && start > stop) { isDescending = true; }

    if (stop !== undefined && typeof stop === 'number' && stop !== 0) {
      rangeLen = Math.abs(stop - start + (!!inclusive ? 1 : 0));
      mapFunc = (_, i) => (start + ((!!isDescending ? -1 : 1) * i * step));
    } else {
      rangeLen = Math.abs(start);
      mapFunc = (_, i) => 0 + (start < 0 ? - i : i);
    }
  }

  // Return Array literal containing only the `start` parameter value if `step` value is 0;
  if (step === 0) {
    return new Array(rangeLen).fill(start);
  }

  return outputRange(new Array(Math.ceil(rangeLen / Math.abs(step))), mapFunc);
};


const FunctionalUtils = {
  debounce,
  getOtherItem,
  getRange,
};

export { ALPH };
export default FunctionalUtils;
