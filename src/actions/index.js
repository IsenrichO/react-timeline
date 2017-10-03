import * as Types from './types';

export const fetchSeedData_Success = (JSON) => ({
  payload: JSON,
  type: Types.FETCH_SEED_DATA_SUCCESS,
});

export const logEventModalData = (payload) => ({
  payload,
  type: Types.LOG_EVENT_MODAL_DATA,
});

export const toggleEventModal = () => ({
  type: Types.TOGGLE_EVENT_MODAL,
});

export const addSingleEvent_Success = (payload) => ({
  payload,
  type: Types.ADD_SINGLE_EVENT_SUCCESS,
});

export const deleteSingleEvent_Success = (payload) => ({
  payload,
  type: Types.DELETE_SINGLE_EVENT_SUCCESS,
});

export const updateSingleEvent_Success = (payload) => ({
  payload,
  type: Types.UPDATE_EVENT_DATA,
});

export const allowBatchSelection = (bool) => ({
  payload: bool,
  type: Types.ALLOW_BATCH_SELECTION,
});

export const addEventToBatchSelection = (evt) => ({
  payload: evt,
  type: Types.ADD_EVENT_TO_BATCH,
});

export const clearBatchSelection = () => ({
  type: Types.CLEAR_BATCH,
});

export const deleteBatchEvents_Success = (data) => ({
  payload: data,
  type: Types.DELETE_BATCH_EVENTS_SUCCESS,
});

export const fetchAllEvents_Success = (data) => ({
  payload: data,
  type: Types.FETCH_ALL_EVENTS_SUCCESS,
});

export const fetchStarredEvents_Success = (data) => ({
  payload: data,
  type: Types.FETCH_STARRED_EVENTS_SUCCESS,
});

export const fetchRecentlyModifiedEvents_Sucess = (data) => ({
  payload: data,
  type: Types.FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS,
});

export const fetchCloudinaryImages_Success = (payload) => ({
  payload,
  type: Types.FETCH_CLOUDINARY_IMAGES_SUCCESS,
});

export const fetchAllEventTags_Success = (payload) => ({
  payload,
  type: Types.FETCH_ALL_EVENT_TAGS_SUCCESS,
});

export const setNewBckgImage = (payload) => ({
  payload,
  type: Types.SET_BCKG_IMAGE,
});
