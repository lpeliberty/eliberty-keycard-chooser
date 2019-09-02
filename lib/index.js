"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactIntl = require("react-intl/dist/react-intl");

var _message = _interopRequireDefault(require("./translations/message.fr"));

var _store = _interopRequireDefault(require("./redux/stores/store"));

var _KeycardChooser = _interopRequireDefault(require("./components/KeycardChooser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _reactDom.render)(_react["default"].createElement(_reactRedux.Provider, {
  store: _store["default"]
}, _react["default"].createElement(_reactIntl.IntlProvider, {
  locale: _store["default"].getState().get('locale'),
  messages: _message["default"]
}, _react["default"].createElement(_KeycardChooser["default"], null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map