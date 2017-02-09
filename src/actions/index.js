'use strict';
import Axios from 'axios';

import * as Types from './types';


export const loadSeedData = (JSON) => ({
  type: Types.LOAD_SEED_DATA,
  payload: JSON 
});

export const logEventModalData = (payload) => ({
  type: Types.LOG_EVENT_MODAL_DATA,
  payload
});

export const toggleEventModal = () => ({
  type: Types.TOGGLE_EVENT_MODAL
});
