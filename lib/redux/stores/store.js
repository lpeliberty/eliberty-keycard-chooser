"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("../reducers/reducers"));

var _defaultState = _interopRequireDefault(require("../stores/defaultState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createStoreWithMiddleWare = (0, _redux.applyMiddleware)(_reduxThunk["default"])(_redux.createStore);
var store = createStoreWithMiddleWare(_reducers["default"], _defaultState["default"], window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var _default = store;
exports["default"] = _default;
//# sourceMappingURL=store.js.map