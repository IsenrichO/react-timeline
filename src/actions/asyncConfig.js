'use strict';
import Axios from 'axios';
import UUID from 'uuid/v4';


const dispatchActionCreator = (dispatch, actionCreator) => (resp) => dispatch(actionCreator(resp.data));

const catchAsyncError = (msg) => (err) => { throw new Error(`${msg}:\t${err}`); };

const config = {
  responseType: 'json',
  timeout: 25000,
  maxRedirects: 5,
  headers: {
    Accept: 'application/json',
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

const generateUuid = {
  transformRequest: [(data) => {
    data.uuid = UUID();
    return data;
  }]
};

export { dispatchActionCreator, catchAsyncError, config, generateUuid };
