'use strict';
import Axios from 'axios';
import * as RoutePaths from '../routing/RoutePaths';
import { dispatchActionCreator, catchAsyncError, config, generateUuid } from './asyncConfig';
import {
  fetchSeedData_Success,
  addSingleEvent_Success,
  deleteSingleEvent_Success,
  updateSingleEvent_Success,
  deleteBatchEvents_Success,
  fetchAllEvents_Success,
  fetchStarredEvents_Success,
  fetchRecentlyModifiedEvents_Sucess,
  fetchCloudinaryImages_Success,
  fetchAllEventTags_Success
} from './index';

import cloudinary from 'cloudinary';


const crudOperation = new Map([
  ['GET', Axios.get],
  ['POST', Axios.post],
  ['PUT', Axios.put],
  ['DELETE', Axios.delete],
  ['ALL', Axios.all],
  ['SPREAD', Axios.spread]
]);

const crudAsync2 = (operation, endpoint = RoutePaths.Events, dispatch, actionCreator, curriedArgs, ...configOpts) => {
  const reqData = { data: curriedArgs };
  const request = operation.bind(null, endpoint, reqData, Object.assign({}, config, reqData, ...configOpts));
  return request()
    .then(resp => {
      actionCreator && !!actionCreator
        ? dispatch(actionCreator(resp.data))
        : null;
    })
    .catch(err => {
      console.error.call(console, `\nError encountered while making request to the '${endpoint}' endpoint:\n>\t${err}`);
    });
};

// Returns a function to be called within the Redux-Thunk middleware:
export const fetchSeedData = () => {
  return (dispatch) => {
    return Axios
      .get(RoutePaths.Events, {
        responseType: 'json',
        maxContentLength: Number.MAX_SAFE_INTEGER,
        onUploadProgress: (progressEvt) => { console.log('Upload in progress...'); },
        validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300,
        maxRedirects: 3,
        timeout: 30000
      })
      .then(dispatchActionCreator(dispatch, fetchSeedData_Success))
      .catch(catchAsyncError('Error encountered while attempting to fetch seed data'));
  };
};


const { Events, getEditEvent, AllEvents, StarredEvents, RecentlyModifiedEvents, Photos, Tags } = RoutePaths;

// 
export const fetchAllEvents = () => (dispatch) =>
  crudAsync2(Axios.get, AllEvents, dispatch, fetchAllEvents_Success);

// 
export const fetchStarredEvents = () => (dispatch) =>
  crudAsync2(Axios.get, StarredEvents, dispatch, fetchStarredEvents_Success);

// 
export const fetchRecentlyModifiedEvents = () => (dispatch) =>
  crudAsync2(Axios.get, RecentlyModifiedEvents, dispatch, fetchRecentlyModifiedEvents_Sucess);
  // headers: { 'X-Limit-Size': 3 }

// 
export const fetchCloudinaryImageData = (list = 'Unsigned') => {
  return (dispatch) => {
    return Axios
      .get(`http://res.cloudinary.com/http-isenrich-io/image/list/${list}.json`)
      .then(resp => {
        dispatch(fetchCloudinaryImages_Success(resp.data));
      })
      .catch(err => { console.log('ERROR ERROR:', err); });
  }
};

// 
export const uploadToCloudinary = (evt, file, filePath) => (dispatch) =>
  crudAsync2(Axios.post, Photos, dispatch, null, { evt, title: file.name, url: filePath });

// 
export const fetchAllCloudinary = () => (dispatch) =>
  crudAsync2(Axios.get, Photos, dispatch, fetchCloudinaryImages_Success);
// 
// export const fetchFromCloudinary = () => (dispatch) =>
//   crudAsync2(Axios.get, Photos, dispatch, null);

// 
export const addSingleEvent = (evtData) => (dispatch) =>
  crudAsync2(Axios.post, Events, dispatch, addSingleEvent_Success, evtData);

// 
export const updateSingleEvent = (evtData) => (dispatch) => 
  crudAsync2(Axios.put, getEditEvent(evtData.uuid), dispatch, updateSingleEvent_Success, evtData);

// 
export const deleteSingleEvt = (evt) => (dispatch) =>
  crudAsync2(Axios.delete, getEditEvent(evt.uuid), dispatch, deleteSingleEvent_Success, evt);

// 
export const deleteBatchEvents = (evts) => (dispatch) =>
  crudAsync2(Axios.delete, Events, dispatch, deleteBatchEvents_Success, evts);

// 
export const fetchAllEventTags = () => (dispatch) =>
  crudAsync2(Axios.get, Tags, dispatch, fetchAllEventTags_Success);
