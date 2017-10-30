/**
 * Rejection tracking prevents a common issue where React gets into an inconsistent state due to
 * some error or another that is encountered, only to then be "swallowed" by a Promise object.
 * Consequently, the user is left with no knowledge of what had caused this erratic behavior and/or
 * how to obviate it going forward.
 */
if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// Provide polyfill for the HTML5 `fetch` API:
require('whatwg-fetch');

// Provide `URLSearchParams` polyfill for deep-linking:
require('url-search-params-polyfill');

// Strong-arm polyfill:
require('core-js');

// Provide a polyfill for CSS's `matchMedia()` media query function:
require('match-media');

// Polyfill the commonly used `Object.assign()` method, popular in React projects:
Object.assign = require('object-assign');
