'use strict';
import Axios from 'axios';

export const FETCH_SEED_DATA = 'FETCH_SEED_DATA';
export const LOG_EVENT_MODAL_DATA = 'LOG_EVENT_MODAL_DATA';
export const TOGGLE_EVENT_MODAL = 'TOGGLE_EVENT_MODAL';


export const fetchSeedData = () => ({
  type: FETCH_SEED_DATA,
  payload: Axios.get('/api/sd')
});

export const logEventModalData = (payload) => ({
  type: LOG_EVENT_MODAL_DATA,
  payload
});

export const toggleEventModal = () => ({
  type: TOGGLE_EVENT_MODAL
});
