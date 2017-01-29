'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import eventEditingModalData from './logEventModalData';
import eventEditingModalState from './editEventModal';


const rootReducer = combineReducers({
  eventEditingModalData,
  eventEditingModalState,
  routing: routerReducer
});

export default rootReducer;
