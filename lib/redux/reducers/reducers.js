'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactIntlRedux = require('react-intl-redux');

var _redux = require('redux');

var reducer = (0, _redux.combineReducers)(_extends({}, reducers, {
  intl: _reactIntlRedux.intlReducer
}));

exports.default = reducer;
//# sourceMappingURL=reducers.js.map