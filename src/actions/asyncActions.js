'use strict';
import Axios from 'axios';
import * as RoutePaths from '../routing/RoutePaths';
import {
  loadSeedData,
  addSingleEvent_Success,
  deleteSingleEvent_Success,
  updateSingleEvent_Success,
  deleteBatchEvents_Success,
  fetchStarredEvents_Success
} from './index';


const dispatchActionCreator = (dispatch, actionCreator) => (resp) => dispatch(actionCreator(resp.data));
const catchAsyncError = (msg) => (err) => { throw new Error(`${msg}:\t${err}`); };
const config = {
  responseType: 'json',
  timeout: 25000,
  maxRedirects: 5,
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: Number.MAX_SAFE_INTEGER,
  validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300,
  onUploadProgress: (progressEvt) => {
    let uploadProgress = Math.round((progressEvt.loaded * 100) / progressEvt.total);
    console.log(`Upload Completion Progress:\t${uploadProgress}`);
    // document.getElementById('output').innerHTML = percentCompleted;
  },
  onDownloadProgress: (progressEvt) => {
    let downloadProgress = Math.round((progressEvt.loaded * 100) / progressEvt.total);
    console.log(`Downloaded Completion Progress:\t${downloadProgress}`);
  }
};

const crudAsync = (operation, dispatch, actionCreator, opts = config) => operation
  .then(resp => {
    dispatch(actionCreator(resp.data));
  })
  .catch(err => {
    throw new Error(`Error encountered while making request:\t${err}`);
  });

const crudAsync2 = (operation, endpoint = RoutePaths.Events, dispatch, actionCreator, opts = config, ...curriedArgs) => {
  const request = operation.bind(null, endpoint, ...curriedArgs, config);
  return request()
    .then(resp => {
      dispatch(actionCreator(resp.data));
    })
    .catch(err => {
      console.error.call(console, `Error encountered while making request:\t${err}`);
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
      .then(dispatchActionCreator(dispatch, loadSeedData))
      .catch(catchAsyncError('Error encountered while attempting to fetch seed data'));
  };
};

// 
export const fetchStarredEvents = () => {
  console.log('Function `fetchStarredEvents()` Called');
  return (dispatch) => {
    return Axios
      .get(RoutePaths.StarredEvents, {
        responseType: 'json',
      })
      .then(dispatchActionCreator(dispatch, fetchStarredEvents_Success))
      .catch(catchAsyncError('Error encountered while attempting to fetch starred events'));
  };
};

// 
// export const addSingleEvent = (evtData) => {
//   let req = Axios.post('/api/events', evtData);
//   return (dispatch) => crudAsync(req, dispatch, addSingleEvent_Success);
// };
export const addSingleEvent = (evtData) => {
  return (dispatch) => crudAsync2(Axios.post, RoutePaths.Events, dispatch, addSingleEvent_Success, config, evtData);
};

// 
// export const updateSingleEvent = (evtData) => {
//   let req = Axios.put(RoutePaths.getEditEvent(evtData.uuid), evtData);
//   return (dispatch) => crudAsync(req, dispatch, updateSingleEvent_Success);
// };
export const updateSingleEvent = (evtData) => {
  return (dispatch) => crudAsync2(Axios.put, RoutePaths.getEditEvent(evtData.uuid), dispatch, updateSingleEvent_Success, config, evtData);
};

// 
export const deleteSingleEvt = (evt) => {
  return (dispatch) => {
    return Axios
      .delete(RoutePaths.getEditEvent(evt.uuid), {
        data: evt,
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(dispatchActionCreator(dispatch, deleteSingleEvent_Success))
      .catch(catchAsyncError('Error encountered while attempting to execute DELETE request'));
  };
};

// 
export const deleteBatchEvents = (evts) => {
  return (dispatch) => {
    return Axios
      .delete(RoutePaths.Events, {
        data: evts,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(dispatchActionCreator(dispatch, deleteBatchEvents_Success))
      .catch(catchAsyncError('Error encountered while attempting to execute multiple DELETE requests'));
  };
};
