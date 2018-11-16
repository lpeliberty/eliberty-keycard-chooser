'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _defaultState = require('../stores/defaultState');

var _defaultState2 = _interopRequireDefault(_defaultState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStoreWithMiddleWare = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

var store = createStoreWithMiddleWare(_reducers2.default, _defaultState2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

exports.default = store;
//# sourceMappingURL=store.js.map