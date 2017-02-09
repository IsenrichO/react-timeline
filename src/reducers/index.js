'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import eventEditingModalData from './logEventModalData';
import eventEditingModalState from './editEventModal';
import seedDataAggregator from './seedDataAggregator';


const rootReducer = combineReducers({
  eventEditingModalData,
  eventEditingModalState,
  routing: routerReducer,
  seedDataAggregator
});

export default rootReducer;
