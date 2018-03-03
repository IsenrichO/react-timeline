/**
 * This will emulate a full ES2015+ environment and is intended to be used in an application rather
 * than a library/tool. This polyfill is automatically loaded when using `babel-node`. Because it
 * is a shim (i.e., ensures the presence of certain built-in functionality), it is included as an
 * ordinary dependency (as opposed to a `dev-dependency`). Also note that we aren't binding the
 * import to a variable. This is because polyfills simply run on their own, prior to the rest of
 * the code base, allowing us to then assume certain native functionality exists.
 */
require('@babel/polyfill');

/**
 * Rejection tracking prevents a common issue where React gets into an inconsistent state due to
 * some error or another that is encountered, only to then be "swallowed" by a Promise object.
 * Consequently, the user is left with no knowledge of what had caused this erratic behavior and/or
 * how to obviate it going forward.
 */
if (typeof Promise === 'undefined' || !window.Promise) {
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

/**
 * The HTML5 `fetch()` API is a Promise-based mechanism for programmatically making web requests in
 * the browser. The `whatwg-fetch` package serves as a polyfill to implement a subset of the
 * standard Fetch specification or, at least, enough so as to make `fetch` a viable replacement for
 * most uses of `XMLHttpRequest` in traditional web applications.
 */
if (!('fetch' in (window || global))) require('whatwg-fetch');

/**
 * The `url-search-params-polyfill` library shims JavaScript's `URLSearchParams` functionality.
 * This library includes all features of the API interface as documented on MDN, and supports both
 * the web and Node.js environments. This polyfill is especially useful for establishing cross-
 * browser support for deep-linking.
 */
if (!('searchParams' in HTMLAnchorElement.prototype)
  || !('URLSearchParams' in (window || global))
) require('url-search-params-polyfill');

/**
 * Include a "strong arm" polyfill to make available all the standard methods that are liable to be
 * absent from non-evergreen browsers. Requiring the `core-js/shim` path (as opposed to the larger
 * import at the `core-js` entry point) avoids global namespace pollution and has a smaller byte
 * footprint, but comes at the expense of sacrificing all available features, especially the non-
 * standard ones. This is an acceptable compromise for our purposes where the main concern is with
 * provisioning older browsers with the necessary polyfills rather than simulating a full browser
 * client's build functionality. Most important among these polyfills is the ES6 `Map` and `Set`
 * collection types, upon which React 16 is dependent.
 */
require('core-js/shim');

/**
 * Provide shorthand for polyfilling two crucial web API methods, `window.requestAnimationFrame`
 * and `window.cancelAnimationFrame`, as necessary. Like the `Map` and `Set` objects in
 * JavaScript, React v16 relies upon `requestAnimationFrame` (even in test environments).
 */
require('raf').polyfill();

// Provide a polyfill for CSS's `matchMedia()` media query function:
require('match-media');

/**
 * Though the familiar `Object#assign` method has enjoyed popular support on major browsers for
 * some time now, less-than-evergreen browsers (including versions of IE 11-) have not implemented
 * such. Because of the importance and wide-ranging use of the method in React-type projects, it
 * is polyfilled where otherwise absent.
 */
if (!('assign' in Object)) Object.assign = require('object-assign');
