'use strict';
import { combineReducers } from 'redux';

import eventEditingModalData from './logEventModalData';
import eventEditingModalState from './editEventModal';


const rootReducer = combineReducers({
  eventEditingModalData,
  eventEditingModalState
});

export default rootReducer;
