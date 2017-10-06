'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyCardArea = require('./KeyCardArea/KeyCardArea');

var _KeyCardArea2 = _interopRequireDefault(_KeyCardArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeycardChooser = function KeycardChooser(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      props.name
    ),
    _react2.default.createElement(_KeyCardArea2.default, null)
  );
};

KeycardChooser.propTypes = {
  name: _propTypes2.default.string
};

exports.default = KeycardChooser;
//# sourceMappingURL=KeycardChooser.js.map