'use strict';
import * as Types from './types';


export const fetchSeedData_Success = (JSON) => ({
  type: Types.FETCH_SEED_DATA_SUCCESS,
  payload: JSON 
});

export const logEventModalData = (payload) => ({
  type: Types.LOG_EVENT_MODAL_DATA,
  payload
});

export const toggleEventModal = () => ({
  type: Types.TOGGLE_EVENT_MODAL
});

export const addSingleEvent_Success = (payload) => ({
  type: Types.ADD_SINGLE_EVENT_SUCCESS,
  payload
});

export const deleteSingleEvent_Success = (payload) => ({
  type: Types.DELETE_SINGLE_EVENT_SUCCESS,
  payload
});

export const updateSingleEvent_Success = (payload) => ({
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

export const fetchAllEvents_Success = (data) => ({
  type: Types.FETCH_ALL_EVENTS_SUCCESS,
  payload: data
});

export const fetchStarredEvents_Success = (data) => ({
  type: Types.FETCH_STARRED_EVENTS_SUCCESS,
  payload: data
});

export const fetchRecentlyModifiedEvents_Sucess = (data) => ({
  type: Types.FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS,
  payload: data
});

export const fetchCloudinaryImages = (payload) => ({
  type: Types.FETCH_CLOUDINARY_IMAGES,
  payload
});
