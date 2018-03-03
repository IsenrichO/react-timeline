import React from 'react';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';

/* CONSTANTS */
export const ALPH = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

//
export const getOtherItem = (list = [], entry) => list.find((item) => item !== entry);

// Returns a function, that, as long as it continues to be invoked, will not
//  be triggered. The function will be called after it stops being called for
//  N milliseconds. If `immediate` is passed, trigger the function on the
//  leading edge, instead of the trailing.
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const [context, args] = [this, arguments];
    const later = () => {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    const callNow = (immediate && !timeout);

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (!!callNow) { func.apply(context, args); }
  };
};

/**
 * This FP-style function returns from a given `list` input an associative (two-dimensional) array
 * whose constituent entries (i.e., the sub-arrays) comprise partitioned subsets of the original
 * list.
 * @param  {Array}    list            [description]
 * @param  {Number}   subsetSize      [description]
 * @param  {Boolean}  withRemainder   [description]
 * @return {Array}                    [description]
 */
export const toPartitions = (list = [], subsetSize = 1, withRemainder = true) => {
  // Preliminary type-check upon provided `list` parameter to ensure it's an array:
  if (!isArray(list)) throw new TypeError(`Provided list is of type ${typeof list}. Must be an Array.`);

  const subRoutine = (size = subsetSize) => {
    let partition = [];

    return (acc, curr, index, collection) => {
      partition.push(curr);
      if ((partition.length === size) || ((index === collection.length - 1) && !!withRemainder)) {
        acc.push(partition);
        partition = [];
      }

      return acc;
    };
  };

  return reduce(list, subRoutine(subsetSize), []);
};

//
const getRange = function(start = 0, stop, step = 1, inclusive = false) {
  const outputRange = (rangeLen, mapFunc) => Array.from(rangeLen, mapFunc);
  const regCharSet = new RegExp('[A-Z]', 'i');

  let rangeLen, mapFunc, isDescending = false;

  if (typeof start !== 'number' && typeof start !== 'string') {
    throw new Error(`Invalid input <${start}> of type <${typeof start}> provided. The` +
                    `\`getRange()\` function accepts either Number or String type inputs.`);
  }

  // Return empty Array literal when called without providing any input(s):
  if (arguments.length === 0) { return new Array(0); }

  if (typeof start === 'string' && regCharSet.test(start) && start.length === 1) {
    // Test that `start` parameter (if not default value) is a valid, single-unit alphabetic character:
    if (stop !== 0 && typeof stop === 'string') {
      if (start > stop) { isDescending = true; }
      let endChar;
      const startChar = start.toUpperCase();

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
      mapFunc = (_, i) => 0 + (start < 0 ? -i : i);
    }
  }

  // Return Array literal containing only the `start` parameter value if `step` value is 0;
  if (step === 0) {
    return new Array(rangeLen).fill(start);
  }

  return outputRange(new Array(Math.ceil(rangeLen / Math.abs(step))), mapFunc);
};


/* EXPORTS */
export default {
  debounce,
  getOtherItem,
  getRange,
  toPartitions,
};
