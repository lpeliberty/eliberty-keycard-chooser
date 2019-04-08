"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.KeycardChooserRoot = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactIntlRedux = require("react-intl-redux");

var _reactIntl = require("react-intl");

var _fr = _interopRequireDefault(require("react-intl/locale-data/fr"));

var _en = _interopRequireDefault(require("react-intl/locale-data/en"));

var _store = _interopRequireDefault(require("./redux/stores/store"));

var _KeycardChooser = _interopRequireDefault(require("./components/KeycardChooser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_en["default"]), _toConsumableArray(_fr["default"])));

var KeycardChooserRoot = function KeycardChooserRoot(props) {
  return _react["default"].createElement(_reactRedux.Provider, {
    store: _store["default"]
  }, _react["default"].createElement(_reactIntlRedux.IntlProvider, null, _react["default"].createElement(_KeycardChooser["default"], props)));
};

exports.KeycardChooserRoot = KeycardChooserRoot;
var _default = KeycardChooserRoot;
exports["default"] = _default;
//# sourceMappingURL=index.js.map