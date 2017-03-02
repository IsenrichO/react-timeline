'use strict';
import React from 'react';
import DateAndTimeUtils from './utility_classes/date-and-time';
import FunctionalUtils from './utility_classes/functional';
import GeneralUtils from './utility_classes/general';
import RenderingUtils from './utility_classes/rendering';
import SortingUtils from './utility_classes/sorting';


const Utils = {
  ...DateAndTimeUtils,
  ...FunctionalUtils,
  ...GeneralUtils,
  ...RenderingUtils,
  ...SortingUtils
};

module.exports = Utils;
