import Axios from 'axios';
import UUID from 'uuid/v4';

const dispatchActionCreator = (dispatch, actionCreator) => (resp) => dispatch(actionCreator(resp.data));

const catchAsyncError = (msg) => (err) => { throw new Error(`${msg}:\t${err}`); };

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  maxContentLength: Number.MAX_SAFE_INTEGER,
  maxRedirects: 5,
  onDownloadProgress(progressEvt) {
    const downloadProgress = Math.round((progressEvt.loaded * 100) / progressEvt.total);
    console.info(`Downloaded Completion Progress:\t${downloadProgress}`);
  },
  onUploadProgress(progressEvt) {
    const uploadProgress = Math.round((progressEvt.loaded * 100) / progressEvt.total);
    console.info(`Upload Completion Progress:\t${uploadProgress}`);
    // document.getElementById('output').innerHTML = percentCompleted;
  },
  responseType: 'json',
  timeout: 25000,
  validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300,
};

const generateUuid = {
  transformRequest: [(data) => {
    data.uuid = UUID();
    return data;
  }],
};

export { dispatchActionCreator, catchAsyncError, config, generateUuid };
