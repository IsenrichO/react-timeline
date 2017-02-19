'use strict';
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

export const addNewEventData = (payload) => ({
    type: Types.ADD_NEW_EVENT_DATA,
    payload
});

export const deleteSingleEvent_Success = (payload) => ({
  type: Types.DELETE_SINGLE_EVENT,
  payload
});

export const updateEventData = (payload) => ({
  type: Types.UPDATE_EVENT_DATA,
  payload
});

export const allowBatchSelection = (bool) => ({
  type: Types.ALLOW_BATCH_SELECTION,
  payload: bool
});

export const addEventToBatchSelection = (evt) => ({
  type: Types.ADD_EVENT_TO_BATCH,
  payload: evt
});

export const clearBatchSelection = () => ({
  type: Types.CLEAR_BATCH
});

export const deleteBatchEvents_Success = (data) => ({
  type: Types.DELETE_BATCH_EVENTS_SUCCESS,
  payload: data
});
