'use strict';
import Axios from 'axios';
import * as Types from './types';
import { loadSeedData, addNewEventData } from './index';


// Returns a function to be called within the Redux-Thunk middleware:
export const fetchSeedData = () => {
  return (dispatch) => {
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


export const addNewEvent = (name, date, location, description) => {
  console.log('Async Action begun');
  return (dispatch) => {
    return Axios
      .post('/api/events', {
        name,
        date,
        location,
        description
      })
      .then(response => {
        console.log('hitting thenable');
        console.log('then response:', response);
        dispatch(addNewEventData(response.data))
      })
      .catch((err) => {
        console.log('then error:', err);
      });
  };
};

// export const addNewEvent = (name, date, location, description) => {
//   console.log('Async Action begun');
//   const request = Axios.post('/api/events', {
//     name,
//     date,
//     location,
//     description
//   });
// };

// name: {
//   type: String,
//   validate: {
//     validator: (name) => name.length >= 3,
//     message: 'Your event name must be at least 3 characters long.'
//   },
//   required: [true, 'This event requires a name.']
// },
// date: {
//   type: Date,
//   validate: {
//     validator: (date) => date.getTime() <= Date.now(),
//     message: 'A date is required for this event.'
//   },
//   required: [true, 'This event requires a date.']
// },
// formattedDate: String,
// noteID: String,
// type: String,
// description: String,
// location: String,
// photos: [EventPhotoSchema],
// tags: [EventTagSchema],
// numRevisions: Number

// export const addNewEvent = () => {
//   return function(dispatch) {
//     return Axios
//       .post('/api/events')
//   };
// };


// export const fetchJobs = (jobSearch, city) => {
//   const request = Axios.post('/api/v1/jobs', {
//     jobTitle: jobSearch,
//     city: city,
//     _csrf: getCookie('_csrf')
//   });

//   return {
//     type: FETCH_JOBS,
//     payload: request
//   };
// };
