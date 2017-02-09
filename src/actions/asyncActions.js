'use strict';
import Axios from 'axios';

import * as Types from './types';
import { loadSeedData } from './index';


// Returns a function and will be called in the Redux-Thunk middleware:
export const fetchSeedData = () => {
  return function(dispatch) {
    return Axios
      .get('/api/events', {
        responseType: 'json',
        maxContentLength: Number.MAX_SAFE_INTEGER,
        onUploadProgress: (progressEvt) => { console.log('Upload in progress...'); },
        validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300,
        maxRedirects: 3,
        timeout: 30000
      })
      .then(response => {
        console.log('thenable duck');
        dispatch(loadSeedData(response.data));
      });
  };
};

// const getTlData = function(cb) {
//   $.ajax({
//     url: '/api/events',
//     method: 'GET',
//     dataType: 'json',
//     success: function(data, status, jqXHR) {
//       console.log('TL Data:', data);
//       cb(data);
//     }
//   });
// };
