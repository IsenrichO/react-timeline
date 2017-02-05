webpackJsonp([1,2],{

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var settle = __webpack_require__(187);
var buildURL = __webpack_require__(190);
var parseHeaders = __webpack_require__(196);
var isURLSameOrigin = __webpack_require__(194);
var createError = __webpack_require__(104);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(189);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (undefined !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(192);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(186);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactModal = __webpack_require__(366);

var _reactModal2 = _interopRequireDefault(_reactModal);

var _EventEditingModalStyles = __webpack_require__(260);

var _EventEditingModalStyles2 = _interopRequireDefault(_EventEditingModalStyles);

var _FileUploadAPI = __webpack_require__(200);

var _FileUploadAPI2 = _interopRequireDefault(_FileUploadAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditEventModal = function (_React$Component) {
  _inherits(EditEventModal, _React$Component);

  function EditEventModal(props) {
    _classCallCheck(this, EditEventModal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.constructCurrentFormattedDate = _this.constructCurrentFormattedDate.bind(_this);
    _this.renderForm = _this.renderForm.bind(_this);
    return _this;
  }

  EditEventModal.prototype.constructCurrentFormattedDate = function constructCurrentFormattedDate() {
    var DATE = new Date();
    return DATE.getUTCMonth() + 1 + '/' + DATE.getUTCDate() + '/' + DATE.getUTCFullYear();
  };

  EditEventModal.prototype.renderForm = function renderForm() {
    var form = _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
          'label',
          { htmlFor: 'title-inpt' },
          'Title'
        ),
        _react2.default.createElement('input', {
          id: 'title-inpt',
          type: 'text',
          defaultValue: this.props.modalData ? this.props.modalData.name : 'Working Title',
          required: true })
      ),
      _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
          'label',
          { htmlFor: 'date-inpt' },
          'Date'
        ),
        _react2.default.createElement('input', {
          id: 'date-inpt',
          type: 'date',
          defaultValue: this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'location-inpt' },
          'Location'
        ),
        _react2.default.createElement('input', {
          id: 'location-inpt',
          type: 'text',
          defaultValue: this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' })
      ),
      _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
          'label',
          { htmlFor: 'description-inpt' },
          'Description'
        ),
        _react2.default.createElement('textarea', {
          id: 'description-inpt',
          placeholder: 'Event description',
          defaultValue: this.props.modalData ? this.props.modalData.description : 'Event description' })
      ),
      _react2.default.createElement(
        'fieldset',
        { id: 'editing-modal-pics' },
        _react2.default.createElement(
          'div',
          {
            className: 'dropzone',
            onDrop: this.handleFileSelect,
            onDragEnter: this.handleDragEnter,
            onDragOver: this.handleDragOver },
          _react2.default.createElement(
            'p',
            null,
            'Drop Your Images Here!'
          )
        ),
        _react2.default.createElement('input', {
          id: 'file-upload-btn',
          type: 'file',
          name: 'files[]',
          accept: 'image/*',
          onChange: this.loadSelectedImages,
          multiple: true }),
        _react2.default.createElement('output', {
          htmlFor: 'file-upload-btn',
          ref: 'fileContainer' })
      )
    );
    return form;
  };

  EditEventModal.prototype.componentDidMount = function componentDidMount() {
    // this.renderForm();
  };

  EditEventModal.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        ref: 'eventModal',
        contentLabel: 'EditEventModal_' + this.props.modalData,
        isOpen: this.props.modalStatus,
        style: _EventEditingModalStyles2.default },
      _react2.default.createElement(
        'i',
        {
          className: 'close-btn',
          onClick: this.props.toggleModal },
        '\xD7'
      ),
      _react2.default.createElement(
        'form',
        { id: 'edit-event-form' },
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'title-inpt' },
            'Title'
          ),
          _react2.default.createElement('input', {
            id: 'title-inpt',
            type: 'text',
            defaultValue: this.props.modalData ? this.props.modalData.name : 'Working Title',
            required: true })
        ),
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'date-inpt' },
            'Date'
          ),
          _react2.default.createElement('input', {
            id: 'date-inpt',
            type: 'date',
            defaultValue: this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() }),
          _react2.default.createElement(
            'label',
            { htmlFor: 'location-inpt' },
            'Location'
          ),
          _react2.default.createElement('input', {
            id: 'location-inpt',
            type: 'text',
            defaultValue: this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' })
        ),
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'description-inpt' },
            'Description'
          ),
          _react2.default.createElement('textarea', {
            id: 'description-inpt',
            placeholder: 'Event description',
            defaultValue: this.props.modalData ? this.props.modalData.description : 'Event description' })
        ),
        _react2.default.createElement(_FileUploadAPI2.default, null)
      )
    );
  };

  return EditEventModal;
}(_react2.default.Component);

var _default = EditEventModal;
exports.default = _default;
;

// TimelineEvent Component props:   evt, evtName, evtLocation, evtAlign, evtDescription, evtNote,
//        SEED_DATA Input Fields:      , name   ,    location,         , description   , type, date

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(EditEventModal, 'EditEventModal', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/EditEventModal.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/EditEventModal.jsx');
}();

;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(105);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 120:
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;


/***/ }),

/***/ 146:
/***/ (function(module, exports) {

/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  return (/input|select|textarea|button|object/.test(nodeName) ?
    !element.disabled :
    "a" === nodeName ?
      element.href || isTabIndexNotNaN :
      isTabIndexNotNaN) && visible(element);
}

function hidden(el) {
  return (el.offsetWidth <= 0 && el.offsetHeight <= 0) ||
    el.style.display === 'none';
}

function visible(element) {
  while (element) {
    if (element === document.body) break;
    if (hidden(element)) return false;
    element = element.parentNode;
  }
  return true;
}

function tabbable(element) {
  var tabIndex = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(function(el) {
    return tabbable(el);
  });
}

module.exports = findTabbableDescendants;



/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(219);

var _Timeline = __webpack_require__(202);

var _Timeline2 = _interopRequireDefault(_Timeline);

var _EditEventModal = __webpack_require__(106);

var _EditEventModal2 = _interopRequireDefault(_EditEventModal);

var _api_calls = __webpack_require__(199);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import SeedData from '../../constants/json/SeedData.json';

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { data: [] };
    _this.updateData = _this._onDataChange.bind(_this);
    return _this;
  }

  App.prototype._onDataChange = function _onDataChange(newData) {
    this.setState({ data: newData });
  };

  // getData(){
  //
  // }

  App.prototype.componentDidMount = function componentDidMount() {
    (0, _api_calls.getTlData)(this.updateData.bind(this));
  };

  App.prototype.render = function render() {
    if (!this.state.data.length) {
      return _react2.default.createElement('div', null);
    }
    return _react2.default.createElement(
      'div',
      { id: 'tl-container' },
      _react2.default.createElement(_Timeline2.default, {
        data: this.state.data }),
      _react2.default.createElement(_EditEventModal2.default, null)
    );
  };

  return App;
}(_react.Component);

// const App = () => (
//   <div id="tl-container">
//     <Timeline
//       data={ SeedData } />
// //     <EditEventModal />
// //   </div>
// // );
//
// export default App;


var _default = App;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(App, 'App', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/pages/App.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/pages/App.jsx');
}();

;

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoteItem = function NoteItem(_ref) {
  var noteID = _ref.params.noteID;
  return _react2.default.createElement(
    'h1',
    null,
    'Note ID: ',
    noteID
  );
};

var _default = NoteItem;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NoteItem, 'NoteItem', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/pages/NotePage.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/pages/NotePage.jsx');
}();

;

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(27);

var _reactRouterRedux = __webpack_require__(45);

var _logEventModalData = __webpack_require__(207);

var _logEventModalData2 = _interopRequireDefault(_logEventModalData);

var _editEventModal = __webpack_require__(206);

var _editEventModal2 = _interopRequireDefault(_editEventModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  eventEditingModalData: _logEventModalData2.default,
  eventEditingModalState: _editEventModal2.default,
  routing: _reactRouterRedux.routerReducer
});

var _default = rootReducer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/travisoneill/Desktop/projects/react-timeline/src/reducers/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/reducers/index.js');
}();

;

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(181);

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var bind = __webpack_require__(105);
var Axios = __webpack_require__(183);
var defaults = __webpack_require__(60);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(102);
axios.CancelToken = __webpack_require__(182);
axios.isCancel = __webpack_require__(103);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(197);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(102);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(60);
var utils = __webpack_require__(11);
var InterceptorManager = __webpack_require__(184);
var dispatchRequest = __webpack_require__(185);
var isAbsoluteURL = __webpack_require__(193);
var combineURLs = __webpack_require__(191);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var transformData = __webpack_require__(188);
var isCancel = __webpack_require__(103);
var defaults = __webpack_require__(60);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(104);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleAccordionSection = exports.debounce = undefined;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function () {
    var context = this,
        args = arguments,
        later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    },
        callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

// Usage
// var myEfficientFn = debounce(function() {
// All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', myEfficientFn);

exports.debounce = debounce;


var toggleAccordionSection = function toggleAccordionSection(evt) {
  var $target = $(evt.currentTarget),
      $mapWrapper = $target.find('.static-map-wrapper'),
      $toggleArrow = $target.find('.map-toggle');

  $toggleArrow.toggleClass('active');
  $mapWrapper.toggleClass('active');
};

exports.toggleAccordionSection = toggleAccordionSection;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(debounce, 'debounce', '/Users/travisoneill/Desktop/projects/react-timeline/src/Utilities.jsx');

  __REACT_HOT_LOADER__.register(toggleAccordionSection, 'toggleAccordionSection', '/Users/travisoneill/Desktop/projects/react-timeline/src/Utilities.jsx');
}();

;

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTlData = getTlData;
function getTlData(callback) {
  $.ajax({
    url: '/api/events',
    method: 'GET',
    success: function success(res) {
      callback(res);
    }
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTlData, 'getTlData', '/Users/travisoneill/Desktop/projects/react-timeline/src/api_calls.js');
}();

;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _FileUploadGlyph_SVG = __webpack_require__(205);

var _FileUploadGlyph_SVG2 = _interopRequireDefault(_FileUploadGlyph_SVG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploadAPI = function (_Component) {
  _inherits(FileUploadAPI, _Component);

  function FileUploadAPI(props) {
    _classCallCheck(this, FileUploadAPI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.loadSelectedImages = _this.loadSelectedImages.bind(_this);
    _this.readInThumbnailWithImageElement = _this.readInThumbnailWithImageElement.bind(_this);
    _this.readInThumbnailWithBckgImage = _this.readInThumbnailWithBckgImage.bind(_this);
    _this.handleFileSelect = _this.handleFileSelect.bind(_this);
    _this.handleDragOver = _this.handleDragOver.bind(_this);
    return _this;
  }

  // Loops through selection of files and asynchronously executes callback on each:


  FileUploadAPI.prototype.loadSelectedImages = function loadSelectedImages(evt, cb) {
    var _ref = [evt.target.files, this.refs.fileContainer],
        Images = _ref[0],
        OutputBin = _ref[1];

    // Loop through selected images and render as thumbnails:

    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) {
        continue;
      }
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  };

  // Appends a `.thumb` <div> with nested a <img> element to specified output target:


  FileUploadAPI.prototype.readInThumbnailWithImageElement = function readInThumbnailWithImageElement(file, index, output) {
    (function (file) {
      var Reader = new FileReader();
      Reader.onload = function (e) {
        var newThumb = document.createElement('DIV');
        newThumb.className = 'thumb';
        newThumb.innerHTML = '<img             src=\'' + e.target.result + '\'            alt=\'ThumbnailImage_' + index + ':\t' + escape(file.name) + '\'            title=\'' + file.name.replace(/['"]/gm, '') + '\' />';
        output.insertBefore(newThumb, null);
      };
      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file);
  };

  // Appends a `.thumb` <div> with `background-image` property-value pair to output target:


  FileUploadAPI.prototype.readInThumbnailWithBckgImage = function readInThumbnailWithBckgImage(file, index, output) {
    (function (file) {
      var Reader = new FileReader();
      Reader.onload = function (evt) {
        var $newThumb = $('<div></div>').addClass('thumb');
        $newThumb.css({ backgroundImage: 'url(' + evt.target.result + ')' });
        output.insertBefore($newThumb[0], null);
      };
      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file);
  };

  // Event handler for the HTML5 drag-n-drop API implementation:


  FileUploadAPI.prototype.handleFileSelect = function handleFileSelect(evt) {
    console.log('EVENT:', evt);
    evt.stopPropagation();
    evt.preventDefault();

    var _ref2 = [evt.dataTransfer.files, this.refs.fileContainer],
        Images = _ref2[0],
        OutputBin = _ref2[1];

    console.log('FILES:', Images);

    // Loop over `Images`, a FileList of constituent File objects:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) {
        continue;
      }
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  };

  // Event handler for the dragEnter event; terminates the bubbling phase:


  FileUploadAPI.prototype.handleDragEnter = function handleDragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  // Event handler for the dragOver event; terminates the bubbling phase:


  FileUploadAPI.prototype.handleDragOver = function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  FileUploadAPI.prototype.render = function render() {
    var ImgLoader = this.readInThumbnailWithBckgImage;
    return _react2.default.createElement(
      'fieldset',
      { className: 'dz-wrapper' },
      _react2.default.createElement(
        'div',
        {
          className: 'dz',
          onDrop: this.handleFileSelect,
          onDragEnter: this.handleDragEnter,
          onDragOver: this.handleDragOver },
        _react2.default.createElement(
          'div',
          { className: 'dz-box' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'file-upload-btn' },
            _react2.default.createElement(_FileUploadGlyph_SVG2.default, null)
          ),
          _react2.default.createElement('input', {
            id: 'file-upload-btn',
            className: 'file-upload-btn',
            type: 'file',
            name: 'files[]',
            accept: 'image/*',
            onChange: this.loadSelectedImages,
            multiple: true }),
          _react2.default.createElement(
            'div',
            { className: 'd-full' },
            [_react2.default.createElement(
              'label',
              {
                key: 'FileUploadSVG_Glyph',
                htmlFor: 'file-upload-btn' },
              _react2.default.createElement(
                'strong',
                null,
                'Choose files'
              )
            ), ' or drop them here']
          )
        )
      ),
      _react2.default.createElement('output', {
        htmlFor: 'file-upload-btn',
        ref: 'fileContainer' })
    );
  };

  return FileUploadAPI;
}(_react.Component);

var _default = FileUploadAPI;
exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FileUploadAPI, 'FileUploadAPI', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/FileUploadAPI.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/FileUploadAPI.jsx');
}();

;

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// &zoom=12
// &format=png
// &maptype=roadmap

// &style=feature:transit%7Ccolor:0xB15B5B%7Cvisibility:off\
// &style=feature:transit%7Celement:geometry.fill%7Cvisibility:off\
// &style=feature:transit%7Celement:geometry.stroke%7Cvisibility:off\
// &style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x4ecc63%7Cvisibility:off\
// &style=feature:transit.line%7Celement:geometry.stroke%7Cvisibility:off\
// &style=feature:transit.station.rail%7Celement:geometry.fill%7Ccolor:0x4ecc63%7Cvisibility:on\
// &style=feature:transit.station.rail%7Celement:geometry.stroke%7Ccolor:0x4ecc63%7Cvisibility:on

var MapStyle = '  &style=feature:administrative%7Celement:geometry%7Cvisibility:on  &style=feature:administrative%7Celement:labels%7Ccolor:0xB15B5B%7Cweight:0.5  &style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x8D4A4B%7Cweight:4  &style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x6473B7%7Cvisibility:simplified%7Cweight:6  &style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off  &style=feature:administrative.locality%7Celement:labels%7Cvisibility:off  &style=feature:administrative.locality%7Celement:labels.text.stroke%7Cvisibility:on%7Cweight:1.5  &style=feature:administrative.neighborhood%7Celement:labels%7Cvisibility:off  &style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xB15B5B%7Clightness:45  &style=feature:landscape.natural.landcover%7Celement:geometry.stroke%7Cvisibility:simplified  &style=feature:landscape.natural.terrain%7Cvisibility:off  &style=feature:poi%7Cvisibility:off  &style=feature:road.arterial%7Ccolor:0xD2D0D4%7Cvisibility:simplified  &style=feature:road.highway%7Ccolor:0xD7D5D8%7Cvisibility:off  &style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off  &style=feature:road.highway.controlled_access%7Cvisibility:off  &style=feature:road.local%7Cvisibility:off  &style=feature:water%7Celement:geometry%7Ccolor:0x989D9B%7Cvisibility:simplified  &style=feature:transit%7Ccolor:0xD2D0D4%7Cvisibility:off';

var StaticGMap = function StaticGMap(_ref) {
  var evtLocation = _ref.evtLocation;

  var key = 'AIzaSyCPV-2q_c8mzFWeY6e70DvHqLP8Zvt7h1U';
  // center='San Francisco';
  var Base = 'https://maps.googleapis.com/maps/api/staticmap?center=' + evtLocation + '&size=400x200' + MapStyle + '&key=' + key;

  return _react2.default.createElement(
    'div',
    { className: 'static-map-wrapper' },
    _react2.default.createElement('img', {
      src: Base,
      alt: 'Google Static Map for ' + evtLocation + '.' })
  );
};

var _default = StaticGMap;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MapStyle, 'MapStyle', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/StaticMapEventLocation.jsx');

  __REACT_HOT_LOADER__.register(StaticGMap, 'StaticGMap', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/StaticMapEventLocation.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/StaticMapEventLocation.jsx');
}();

;

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(27);

var _reactRedux = __webpack_require__(44);

var _TimelineEvent = __webpack_require__(203);

var _TimelineEvent2 = _interopRequireDefault(_TimelineEvent);

var _EditEventModal = __webpack_require__(106);

var _EditEventModal2 = _interopRequireDefault(_EditEventModal);

var _index = __webpack_require__(61);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Component) {
  _inherits(Timeline, _Component);

  function Timeline(props) {
    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.logModalData = _this.logModalData.bind(_this);
    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.orderTimelineEvents = _this.orderTimelineEvents.bind(_this);
    _this.renderOrderedEvents = _this.renderOrderedEvents.bind(_this);
    return _this;
  }

  Timeline.prototype.toggleModal = function toggleModal() {
    this.props.toggleEventModal();
  };

  Timeline.prototype.logModalData = function logModalData(data) {
    this.props.logEventModalData(data);
  };

  Timeline.prototype.orderTimelineEvents = function orderTimelineEvents(events) {
    return events && events.length ? events.sort(function (evt1, evt2) {
      return new Date(evt2.date).getTime() - new Date(evt1.date).getTime();
    }) : [];
  };

  Timeline.prototype.renderOrderedEvents = function renderOrderedEvents(events) {
    var _this2 = this;

    return events.map(function (evt, index) {
      return _react2.default.createElement(_TimelineEvent2.default, {
        key: 'Evt' + evt.name + index,
        evt: evt,
        evtName: evt.name,
        evtLocation: evt.location,
        evtAlign: new Array('', '-invert')[index % 2],
        evtDescription: evt.description,
        evtNote: evt.type,
        logModalData: _this2.logModalData,
        toggleModal: _this2.toggleModal });
    });
  };

  Timeline.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        { className: 'tl' },
        this.renderOrderedEvents(this.orderTimelineEvents(this.props.data))
      ),
      _react2.default.createElement(_EditEventModal2.default, {
        modalStatus: this.props.eventEditingModalState,
        toggleModal: this.toggleModal,
        modalData: this.props.eventEditingModalData })
    );
  };

  return Timeline;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    logEventModalData: _index.logEventModalData,
    toggleEventModal: _index.toggleEventModal
  }, dispatch);
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Timeline);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Timeline, 'Timeline', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/Timeline.jsx');

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/Timeline.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/Timeline.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/Timeline.jsx');
}();

;

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _TimelineEventToolbar = __webpack_require__(204);

var _TimelineEventToolbar2 = _interopRequireDefault(_TimelineEventToolbar);

var _StaticMapEventLocation = __webpack_require__(201);

var _StaticMapEventLocation2 = _interopRequireDefault(_StaticMapEventLocation);

var _Utilities = __webpack_require__(198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounceToggle = function debounceToggle(evt) {
  return (0, _Utilities.debounce)((0, _Utilities.toggleAccordionSection)(evt), 2000, true);
};

var TimelineEvent = function TimelineEvent(_ref) {
  var evt = _ref.evt,
      evtName = _ref.evtName,
      evtLocation = _ref.evtLocation,
      evtAlign = _ref.evtAlign,
      evtDescription = _ref.evtDescription,
      evtNote = _ref.evtNote,
      logModalData = _ref.logModalData,
      toggleModal = _ref.toggleModal;
  return _react2.default.createElement(
    'li',
    { className: 'tl-event' + evtAlign },
    _react2.default.createElement(
      'div',
      { className: 'tl-marker' },
      _react2.default.createElement('i', { className: 'glyphicon glyphicon-record' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'tl-event-panel' },
      _react2.default.createElement(_TimelineEventToolbar2.default, {
        evt: evt,
        logModalData: logModalData,
        toggleModal: toggleModal }),
      _react2.default.createElement(
        'div',
        { className: 'panel-header' },
        _react2.default.createElement(
          'h3',
          null,
          evtName
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-body' },
        evtDescription,
        _react2.default.createElement(
          'div',
          {
            className: 'tl-location',
            onClick: debounceToggle },
          _react2.default.createElement('i', { className: 'glyphicon glyphicon-map-marker' }),
          _react2.default.createElement(
            'em',
            { key: 'Location_' + evtLocation },
            evtLocation
          ),
          _react2.default.createElement('i', { className: 'map-toggle glyphicon glyphicon-menu-right' }),
          _react2.default.createElement(_StaticMapEventLocation2.default, {
            evtLocation: evtLocation })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-footer' },
        evtNote
      )
    )
  );
};

var _default = TimelineEvent;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(debounceToggle, 'debounceToggle', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/TimelineEvent.jsx');

  __REACT_HOT_LOADER__.register(TimelineEvent, 'TimelineEvent', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/TimelineEvent.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/TimelineEvent.jsx');
}();

;

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimelineEventToolbar = function TimelineEventToolbar(_ref) {
  var evt = _ref.evt,
      logModalData = _ref.logModalData,
      toggleModal = _ref.toggleModal;
  return _react2.default.createElement(
    'div',
    { className: 'tl-toolbar' },
    _react2.default.createElement(
      'button',
      {
        type: 'button',
        name: 'View full event',
        title: 'Show full note' },
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/notes/' + evt.noteID },
        _react2.default.createElement('i', {
          className: 'glyphicon glyphicon-eye-open' })
      )
    ),
    _react2.default.createElement(
      'button',
      {
        type: 'button',
        name: 'EditEventBtn',
        title: 'Enter quick edit mode' },
      _react2.default.createElement('i', {
        className: 'glyphicon glyphicon-pencil',
        onClick: function onClick() {
          logModalData(evt);toggleModal();
        } })
    ),
    _react2.default.createElement(
      'button',
      {
        type: 'button',
        name: 'SocialShareBtn',
        title: 'Share to your social networks' },
      _react2.default.createElement('i', {
        className: 'glyphicon glyphicon-send'
        // onClick={ () => {} }
      })
    )
  );
};

var _default = TimelineEventToolbar;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimelineEventToolbar, 'TimelineEventToolbar', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/TimelineEventToolbar.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/components/TimelineEventToolbar.jsx');
}();

;

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUploadGlyph = function FileUploadGlyph() {
  return _react2.default.createElement(
    'svg',
    {
      className: 'inline-svg file-upload-glyph',
      version: '1.2',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 50 42.418259' },
    _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement('path', {
        className: 'upload-arrow',
        d: 'm 25.000276,0 -12.974996,12.226439 8.234132,0 0,12.725477 9.481728,0 0,-12.725477 8.234132,0 L 25.000276,0 Z' }),
      _react2.default.createElement('path', {
        className: 'upload-bin',
        d: 'm 48.205557,28.694703 -7.984613,-5.239902 -4.990383,0 8.483651,6.487498 -8.73317,0 c -0.249519,0 -0.499038,0.249519 -0.499038,0.249519 l -1.996154,5.738941 -14.971149,0 -1.996153,-5.489422 c -0.249519,-0.249519 -0.249519,-0.499038 -0.499039,-0.499038 l -8.9826887,0 8.4836507,-6.487498 -4.9903825,0 -7.984613,5.239902 c -0.99807668,0.748558 -1.74663415,2.495192 -1.497115,3.742788 l 1.497115,7.735094 c 0.2495191,1.247595 1.7466341,2.245672 2.9942298,2.245672 l 40.6716217,0 c 1.497115,0 2.744711,-0.998077 3.243749,-2.245672 l 1.497115,-7.735094 c 0.249519,-1.247596 -0.499038,-2.99423 -1.746634,-3.742788 z' })
    )
  );
};

var _default = FileUploadGlyph;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FileUploadGlyph, 'FileUploadGlyph', '/Users/travisoneill/Desktop/projects/react-timeline/src/constants/svg/FileUploadGlyph_SVG.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/constants/svg/FileUploadGlyph_SVG.jsx');
}();

;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventEditingModalState;

var _index = __webpack_require__(61);

function eventEditingModalState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case _index.TOGGLE_EVENT_MODAL:
      // console.log(`Action ${action.type} executed with empty payload!`);
      state = !state;
    default:
      return state;
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(eventEditingModalState, 'eventEditingModalState', '/Users/travisoneill/Desktop/projects/react-timeline/src/reducers/editEventModal.js');
}();

;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventEditingModalData;

var _index = __webpack_require__(61);

var DefaultState = {
  name: '',
  type: 'General',
  description: '',
  location: 'San Francisco, CA',
  date: new Date()
};

function eventEditingModalData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultState;
  var action = arguments[1];

  switch (action.type) {
    case _index.LOG_EVENT_MODAL_DATA:
      // console.log(`Action ${action.type} executed with payload `, action.payload);
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DefaultState, 'DefaultState', '/Users/travisoneill/Desktop/projects/react-timeline/src/reducers/logEventModalData.js');

  __REACT_HOT_LOADER__.register(eventEditingModalData, 'eventEditingModalData', '/Users/travisoneill/Desktop/projects/react-timeline/src/reducers/logEventModalData.js');
}();

;

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

module.exports = function(opts) {
  return new ElementClass(opts)
}

function indexOf(arr, prop) {
  if (arr.indexOf) return arr.indexOf(prop)
  for (var i = 0, len = arr.length; i < len; i++)
    if (arr[i] === prop) return i
  return -1
}

function ElementClass(opts) {
  if (!(this instanceof ElementClass)) return new ElementClass(opts)
  var self = this
  if (!opts) opts = {}

  // similar doing instanceof HTMLElement but works in IE8
  if (opts.nodeType) opts = {el: opts}

  this.opts = opts
  this.el = opts.el || document.body
  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
}

ElementClass.prototype.add = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return el.className = className
  var classes = el.className.split(' ')
  if (indexOf(classes, className) > -1) return classes
  classes.push(className)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.remove = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return
  var classes = el.className.split(' ')
  var idx = indexOf(classes, className)
  if (idx > -1) classes.splice(idx, 1)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.has = function(className) {
  var el = this.el
  if (!el) return
  var classes = el.className.split(' ')
  return indexOf(classes, className) > -1
}

ElementClass.prototype.toggle = function(className) {
  var el = this.el
  if (!el) return
  if (this.has(className)) this.remove(className)
  else this.add(className)
}


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),

/***/ 219:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

module.exports = {
	"overlay": {
		"position": "fixed",
		"top": 0,
		"bottom": 0,
		"left": 0,
		"right": 0,
		"background": "rgba(94, 94, 94, 0.75)",
		"backgroundBlendMode": "soft-light",
		"zIndex": 150
	},
	"content": {
		"position": "relative",
		"width": "55vw",
		"maxWidth": "700px",
		"height": "auto",
		"minHeight": "45vh",
		"maxHeight": "80vh",
		"top": "50%",
		"left": "50%",
		"marginRight": "-50%",
		"padding": 0,
		"WebkitBorderRadius": "8px",
		"MozBorderRadius": "8px",
		"borderRadius": "8px",
		"WebkitTransform": "translate(-50%, -50%)",
		"MozTransform": "translate(-50%, -50%)",
		"MsTransform": "translate(-50%, -50%)",
		"OTransform": "translate(-50%, -50%)",
		"transform": "translate(-50%, -50%)",
		"overflow": "visible",
		"zIndex": 200
	}
};

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(2);
var ReactDOM = __webpack_require__(35);
var ExecutionEnvironment = __webpack_require__(218);
var ModalPortal = React.createFactory(__webpack_require__(362));
var ariaAppHider = __webpack_require__(363);
var elementClass = __webpack_require__(217);
var renderSubtreeIntoContainer = __webpack_require__(35).unstable_renderSubtreeIntoContainer;
var Assign = __webpack_require__(120);

var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};
var AppElement = ExecutionEnvironment.canUseDOM ? document.body : {appendChild: function() {}};

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = React.createClass({

  displayName: 'Modal',
  statics: {
    setAppElement: function(element) {
        AppElement = ariaAppHider.setElement(element);
    },
    injectCSS: function() {
      "production" !== undefined
        && console.warn('React-Modal: injectCSS has been deprecated ' +
                        'and no longer has any effect. It will be removed in a later version');
    }
  },

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    style: React.PropTypes.shape({
      content: React.PropTypes.object,
      overlay: React.PropTypes.object
    }),
    portalClassName: React.PropTypes.string,
    appElement: React.PropTypes.instanceOf(SafeHTMLElement),
    onAfterOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    closeTimeoutMS: React.PropTypes.number,
    ariaHideApp: React.PropTypes.bool,
    shouldCloseOnOverlayClick: React.PropTypes.bool,
    parentSelector: React.PropTypes.func,
    role: React.PropTypes.string,
    contentLabel: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      isOpen: false,
      portalClassName: 'ReactModalPortal',
      ariaHideApp: true,
      closeTimeoutMS: 0,
      shouldCloseOnOverlayClick: true,
      parentSelector: function () { return document.body; }
    };
  },

  componentDidMount: function() {
    this.node = document.createElement('div');
    this.node.className = this.props.portalClassName;

    var parent = getParentElement(this.props.parentSelector);
    parent.appendChild(this.node);
    this.renderPortal(this.props);
  },

  componentWillReceiveProps: function(newProps) {
    var currentParent = getParentElement(this.props.parentSelector);
    var newParent = getParentElement(newProps.parentSelector);

    if(newParent !== currentParent) {
      currentParent.removeChild(this.node);
      newParent.appendChild(this.node);
    }

    this.renderPortal(newProps);
  },

  componentWillUnmount: function() {
    if (this.props.ariaHideApp) {
      ariaAppHider.show(this.props.appElement);
    }

    ReactDOM.unmountComponentAtNode(this.node);
    var parent = getParentElement(this.props.parentSelector);
    parent.removeChild(this.node);
    elementClass(document.body).remove('ReactModal__Body--open');
  },

  renderPortal: function(props) {
    if (props.isOpen) {
      elementClass(document.body).add('ReactModal__Body--open');
    } else {
      elementClass(document.body).remove('ReactModal__Body--open');
    }

    if (props.ariaHideApp) {
      ariaAppHider.toggle(props.isOpen, props.appElement);
    }

    this.portal = renderSubtreeIntoContainer(this, ModalPortal(Assign({}, props, {defaultStyles: Modal.defaultStyles})), this.node);
  },

  render: function () {
    return React.DOM.noscript();
  }
});

Modal.defaultStyles = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position                : 'absolute',
    top                     : '40px',
    left                    : '40px',
    right                   : '40px',
    bottom                  : '40px',
    border                  : '1px solid #ccc',
    background              : '#fff',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : '4px',
    outline                 : 'none',
    padding                 : '20px'
  }
}

module.exports = Modal


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(2);
var div = React.DOM.div;
var focusManager = __webpack_require__(364);
var scopeTab = __webpack_require__(365);
var Assign = __webpack_require__(120);

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: {
    base: 'ReactModal__Overlay',
    afterOpen: 'ReactModal__Overlay--after-open',
    beforeClose: 'ReactModal__Overlay--before-close'
  },
  content: {
    base: 'ReactModal__Content',
    afterOpen: 'ReactModal__Content--after-open',
    beforeClose: 'ReactModal__Content--before-close'
  }
};

var ModalPortal = module.exports = React.createClass({

  displayName: 'ModalPortal',
  shouldClose: null,

  getDefaultProps: function() {
    return {
      style: {
        overlay: {},
        content: {}
      }
    };
  },

  getInitialState: function() {
    return {
      afterOpen: false,
      beforeClose: false
    };
  },

  componentDidMount: function() {
    // Focus needs to be set when mounting and already open
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.closeTimer);
  },

  componentWillReceiveProps: function(newProps) {
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  },

  componentDidUpdate: function () {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  },

  setFocusAfterRender: function (focus) {
    this.focusAfterRender = focus;
  },

  open: function() {
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({ beforeClose: false });
    } else {
      focusManager.setupScopedFocus(this.node);
      focusManager.markForFocusLater();
      this.setState({isOpen: true}, function() {
        this.setState({afterOpen: true});

        if (this.props.isOpen && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      }.bind(this));
    }
  },

  close: function() {
    if (this.props.closeTimeoutMS > 0)
      this.closeWithTimeout();
    else
      this.closeWithoutTimeout();
  },

  focusContent: function() {
    // Don't steal focus from inner elements
    if (!this.contentHasFocus()) {
      this.refs.content.focus();
    }
  },

  closeWithTimeout: function() {
    this.setState({beforeClose: true}, function() {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
    }.bind(this));
  },

  closeWithoutTimeout: function() {
    this.setState({
      beforeClose: false,
      isOpen: false,
      afterOpen: false,
    }, this.afterClose);
  },

  afterClose: function() {
    focusManager.returnFocus();
    focusManager.teardownScopedFocus();
  },

  handleKeyDown: function(event) {
    if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content, event);
    if (event.keyCode == 27 /*esc*/) {
      event.preventDefault();
      this.requestClose(event);
    }
  },

  handleOverlayMouseDown: function(event) {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }
  },

  handleOverlayMouseUp: function(event) {
    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose())
        this.requestClose(event);
      else
        this.focusContent();
    }
    this.shouldClose = null;
  },

  handleContentMouseDown: function(event) {
    this.shouldClose = false;
  },

  handleContentMouseUp: function(event) {
    this.shouldClose = false;
  },

  requestClose: function(event) {
    if (this.ownerHandlesClose())
      this.props.onRequestClose(event);
  },

  ownerHandlesClose: function() {
    return this.props.onRequestClose;
  },

  shouldBeClosed: function() {
    return !this.props.isOpen && !this.state.beforeClose;
  },

  contentHasFocus: function() {
    return document.activeElement === this.refs.content || this.refs.content.contains(document.activeElement);
  },

  buildClassName: function(which, additional) {
    var className = CLASS_NAMES[which].base;
    if (this.state.afterOpen)
      className += ' '+CLASS_NAMES[which].afterOpen;
    if (this.state.beforeClose)
      className += ' '+CLASS_NAMES[which].beforeClose;
    return additional ? className + ' ' + additional : className;
  },

  render: function() {
    var contentStyles = (this.props.className) ? {} : this.props.defaultStyles.content;
    var overlayStyles = (this.props.overlayClassName) ? {} : this.props.defaultStyles.overlay;

    return this.shouldBeClosed() ? div() : (
      div({
        ref: "overlay",
        className: this.buildClassName('overlay', this.props.overlayClassName),
        style: Assign({}, overlayStyles, this.props.style.overlay || {}),
        onMouseDown: this.handleOverlayMouseDown,
        onMouseUp: this.handleOverlayMouseUp
      },
        div({
          ref: "content",
          style: Assign({}, contentStyles, this.props.style.content || {}),
          className: this.buildClassName('content', this.props.className),
          tabIndex: "-1",
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleContentMouseDown,
          onMouseUp: this.handleContentMouseUp,
          role: this.props.role,
          "aria-label": this.props.contentLabel
        },
          this.props.children
        )
      )
    );
  }
});


/***/ }),

/***/ 363:
/***/ (function(module, exports) {

var _element = typeof document !== 'undefined' ? document.body : null;

function setElement(element) {
  if (typeof element === 'string') {
    var el = document.querySelectorAll(element);
    element = 'length' in el ? el[0] : el;
  }
  _element = element || _element;
  return _element;
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || _element).setAttribute('aria-hidden', 'true');
}

function show(appElement) {
  validateElement(appElement);
  (appElement || _element).removeAttribute('aria-hidden');
}

function toggle(shouldHide, appElement) {
  if (shouldHide)
    hide(appElement);
  else
    show(appElement);
}

function validateElement(appElement) {
  if (!appElement && !_element)
    throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
}

function resetForTesting() {
  _element = document.body;
}

exports.toggle = toggle;
exports.setElement = setElement;
exports.show = show;
exports.hide = hide;
exports.resetForTesting = resetForTesting;


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

var findTabbable = __webpack_require__(146);
var modalElement = null;
var focusLaterElement = null;
var needToFocus = false;

function handleBlur(event) {
  needToFocus = true;
}

function handleFocus(event) {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation 
    // is that the document.body gets focus, and then we focus our element right 
    // after, seems fine.
    setTimeout(function() {
      if (modalElement.contains(document.activeElement))
        return;
      var el = (findTabbable(modalElement)[0] || modalElement);
      el.focus();
    }, 0);
  }
}

exports.markForFocusLater = function() {
  focusLaterElement = document.activeElement;
};

exports.returnFocus = function() {
  try {
    focusLaterElement.focus();
  }
  catch (e) {
    console.warn('You tried to return focus to '+focusLaterElement+' but it is not in the DOM anymore');
  }
  focusLaterElement = null;
};

exports.setupScopedFocus = function(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener('blur', handleBlur, false);
    document.addEventListener('focus', handleFocus, true);
  } else {
    window.attachEvent('onBlur', handleBlur);
    document.attachEvent('onFocus', handleFocus);
  }
};

exports.teardownScopedFocus = function() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('focus', handleFocus);
  } else {
    window.detachEvent('onBlur', handleBlur);
    document.detachEvent('onFocus', handleFocus);
  }
};




/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

var findTabbable = __webpack_require__(146);

module.exports = function(node, event) {
  var tabbable = findTabbable(node);
  if (!tabbable.length) {
      event.preventDefault();
      return;
  }
  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = (
    finalTabbable === document.activeElement ||
    // handle immediate shift+tab after opening with mouse
    node === document.activeElement
  );
  if (!leavingFinalTabbable) return;
  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
};


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(361);



/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(35);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(27);

var _reactRedux = __webpack_require__(44);

var _reactRouter = __webpack_require__(46);

var _reactRouterRedux = __webpack_require__(45);

var _App = __webpack_require__(174);

var _App2 = _interopRequireDefault(_App);

var _NotePage = __webpack_require__(175);

var _NotePage2 = _interopRequireDefault(_NotePage);

var _index = __webpack_require__(176);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add the reducer to your store on the `routing` key:
var store = (0, _redux.createStore)(_index2.default);
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// );

// Create an enhanced history that syncs navigation events with the store:
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

// 
var RouterConfig = function RouterConfig() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouter.Router,
      { history: history },
      _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: 'notes/:noteID', component: _NotePage2.default })
    )
  );
};

var _default = RouterConfig;
exports.default = _default;

// Inject router configuration into HTML insertion <div>:

_reactDom2.default.render(_react2.default.createElement(RouterConfig, null), document.getElementById('root'));
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(store, 'store', '/Users/travisoneill/Desktop/projects/react-timeline/src/Routes.jsx');

  __REACT_HOT_LOADER__.register(history, 'history', '/Users/travisoneill/Desktop/projects/react-timeline/src/Routes.jsx');

  __REACT_HOT_LOADER__.register(RouterConfig, 'RouterConfig', '/Users/travisoneill/Desktop/projects/react-timeline/src/Routes.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/travisoneill/Desktop/projects/react-timeline/src/Routes.jsx');
}();

;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(11);
var normalizeHeaderName = __webpack_require__(195);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(101);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(101);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleEventModal = exports.logEventModalData = exports.fetchSeedData = exports.TOGGLE_EVENT_MODAL = exports.LOG_EVENT_MODAL_DATA = exports.FETCH_SEED_DATA = undefined;

var _axios = __webpack_require__(180);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FETCH_SEED_DATA = exports.FETCH_SEED_DATA = 'FETCH_SEED_DATA';
var LOG_EVENT_MODAL_DATA = exports.LOG_EVENT_MODAL_DATA = 'LOG_EVENT_MODAL_DATA';
var TOGGLE_EVENT_MODAL = exports.TOGGLE_EVENT_MODAL = 'TOGGLE_EVENT_MODAL';

var fetchSeedData = exports.fetchSeedData = function fetchSeedData() {
  return {
    type: FETCH_SEED_DATA,
    payload: _axios2.default.get('/api/sd')
  };
};

var logEventModalData = exports.logEventModalData = function logEventModalData(payload) {
  return {
    type: LOG_EVENT_MODAL_DATA,
    payload: payload
  };
};

var toggleEventModal = exports.toggleEventModal = function toggleEventModal() {
  return {
    type: TOGGLE_EVENT_MODAL
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FETCH_SEED_DATA, 'FETCH_SEED_DATA', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');

  __REACT_HOT_LOADER__.register(LOG_EVENT_MODAL_DATA, 'LOG_EVENT_MODAL_DATA', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');

  __REACT_HOT_LOADER__.register(TOGGLE_EVENT_MODAL, 'TOGGLE_EVENT_MODAL', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');

  __REACT_HOT_LOADER__.register(fetchSeedData, 'fetchSeedData', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');

  __REACT_HOT_LOADER__.register(logEventModalData, 'logEventModalData', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');

  __REACT_HOT_LOADER__.register(toggleEventModal, 'toggleEventModal', '/Users/travisoneill/Desktop/projects/react-timeline/src/actions/index.js');
}();

;

/***/ })

},[424]);
//# sourceMappingURL=bundle.977a8155fda229454b15.js.map