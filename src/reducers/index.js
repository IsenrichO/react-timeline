'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import eventEditingModalData from './logEventModalData';
import eventEditingModalState from './editEventModal';
import seedDataAggregator from './seedDataAggregator';
import batchSelectionState from './batchSelectionState';
import batchSelectionItems from './batchSelectionItems';


const rootReducer = combineReducers({
  eventEditingModalData,
  eventEditingModalState,
  routing: routerReducer,
  seedDataAggregator,
  batchSelectionState,
  batchSelectionItems
});

export default rootReducer;
