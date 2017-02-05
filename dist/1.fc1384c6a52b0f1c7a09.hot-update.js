webpackHotUpdate(1,{

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

/***/ })

})
//# sourceMappingURL=1.fc1384c6a52b0f1c7a09.hot-update.js.map