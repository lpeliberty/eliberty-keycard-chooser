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

// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

var KeycardChooser = function KeycardChooser(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      props.name
    ),
    _react2.default.createElement(_KeyCardArea2.default, {
      keycardTypes: props.keycardTypes,
      cardNumberList: props.cardNumberList,
      keycards: props.keycards,
      params: props.params,
      orderitem: props.orderitem,
      changeCardNumber: props.changeCardNumber,
      onChangeCheck: props.onChangeCheck,
      itemFieldsDefinition: props.itemFieldsDefinition
    })
  );
};

KeycardChooser.propTypes = {
  keycardTypes: _propTypes2.default.object.isRequired,
  cardNumberList: _propTypes2.default.object.isRequired,
  keycards: _propTypes2.default.object.isRequired,
  params: _propTypes2.default.object.isRequired,
  orderitem: _propTypes2.default.object.isRequired,
  itemFieldsDefinition: _propTypes2.default.object.isRequired,
  changeCardNumber: _propTypes2.default.func.isRequired,
  onChangeCheck: _propTypes2.default.func.isRequired
};

exports.default = KeycardChooser;
//# sourceMappingURL=KeycardChooser.js.map