'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactIntlRedux = require('react-intl-redux');

var _reactIntl = require('react-intl');

var _fr = require('react-intl/locale-data/fr');

var _fr2 = _interopRequireDefault(_fr);

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

var _store = require('../redux/stores/store');

var _store2 = _interopRequireDefault(_store);

var _KeyCardArea = require('./KeyCardArea/KeyCardArea');

var _KeyCardArea2 = _interopRequireDefault(_KeyCardArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_en2.default), _toConsumableArray(_fr2.default)));

var KeycardChooser = function KeycardChooser(props) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(
      _reactIntlRedux.IntlProvider,
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
        changeCardNumber: props.changeCardNumber
      })
    )
  );
};

KeycardChooser.propTypes = {
  keycardTypes: _propTypes2.default.object.isRequired,
  cardNumberList: _propTypes2.default.object.isRequired,
  keycards: _propTypes2.default.object.isRequired,
  params: _propTypes2.default.object.isRequired,
  orderitem: _propTypes2.default.object.isRequired,
  changeCardNumber: _propTypes2.default.func.isRequired
};

exports.default = KeycardChooser;
//# sourceMappingURL=KeycardChooser.js.map