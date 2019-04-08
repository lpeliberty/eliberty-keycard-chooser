"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyCard = _interopRequireDefault(require("./KeyCard/KeyCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

/**
 * Keycard Chooser
 */
var KeycardChooser = function KeycardChooser(props) {
  return _react["default"].createElement("div", {
    key: "".concat(props.localItemInfo.get('index'))
  }, _react["default"].createElement(_KeyCard["default"] // key={props.localItemInfo.get('index')}
  , {
    id: "".concat(props.localItemInfo.get('index')),
    keycardPictureSrc: props.keycardPictureSrc,
    keycardTypes: props.keycardTypes,
    keycards: props.keycards,
    params: props.params,
    orderitem: props.orderitem,
    onChangeCheck: props.onChangeCheck,
    fields: props.fields,
    popover: props.popover,
    popoverLink: props.popoverLink,
    hasSupport: props.hasSupport,
    localItemInfo: props.localItemInfo,
    updateFieldsErrors: props.updateFieldsErrors,
    deleteKeyFieldsErrors: props.deleteKeyFieldsErrors,
    updateCurrentCardNumberType: props.updateCurrentCardNumberType,
    updateValidField: props.updateValidField,
    stateUpdateCardNumberTypeProperty: props.stateUpdateCardNumberTypeProperty,
    checkValidKeycard: props.checkValidKeycard
  }));
};

KeycardChooser.propTypes = {
  keycardPictureSrc: _propTypes["default"].string.isRequired,
  // keycard picture src
  keycardTypes: _propTypes["default"].object.isRequired,
  // keycards to display the tabs
  keycards: _propTypes["default"].object.isRequired,
  params: _propTypes["default"].object.isRequired,
  // generic params
  orderitem: _propTypes["default"].object.isRequired,
  fields: _propTypes["default"].object.isRequired,
  // Fields mapping
  popover: _propTypes["default"].object.isRequired,
  // content for popover info keycard
  popoverLink: _propTypes["default"].object.isRequired,
  // content for popover link keycard
  localItemInfo: _propTypes["default"].object.isRequired,
  // current localItem
  onChangeCheck: _propTypes["default"].func.isRequired,
  // function to make changes when checking
  updateFieldsErrors: _propTypes["default"].func.isRequired,
  // function to update fields errors
  deleteKeyFieldsErrors: _propTypes["default"].func.isRequired,
  // function to delete key on fields errors
  updateCurrentCardNumberType: _propTypes["default"].func.isRequired,
  // function to update current cardNumber type
  updateValidField: _propTypes["default"].func.isRequired,
  //
  hasSupport: _propTypes["default"].bool.isRequired,
  // boolean indicating support element
  stateUpdateCardNumberTypeProperty: _propTypes["default"].func.isRequired,
  // function to update cardNumber property value
  checkValidKeycard: _propTypes["default"].func.isRequired // function to check complete valid cardNumber

};
var _default = KeycardChooser;
exports["default"] = _default;
//# sourceMappingURL=KeycardChooser.js.map