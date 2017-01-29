'use strict';

export const LOG_EVENT_MODAL_DATA = 'LOG_EVENT_MODAL_DATA';
export const TOGGLE_EVENT_MODAL = 'TOGGLE_EVENT_MODAL';


export const logEventModalData = (payload) => ({
  type: LOG_EVENT_MODAL_DATA,
  payload
});

export const toggleEventModal = () => ({
  type: TOGGLE_EVENT_MODAL
});
