/* TRUE CONSTANTS */
const BASE_PATH = '/api/'; // '/api/v1/';

/* UTILITY FUNCTIONS */
const constructApiEndpoint = (endpointPath = '') => `${BASE_PATH}${String(endpointPath)}`;

/* COMPILED DEFAULT EXPORT */
module.exports = {
  // Constants:
  BASE_PATH,

  // Helpers:
  constructApiEndpoint,
};
