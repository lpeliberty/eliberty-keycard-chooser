'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyCard = require('./KeyCard/KeyCard');

var _KeyCard2 = _interopRequireDefault(_KeyCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

/**
 * Keycard Chooser
 */
var KeycardChooser = function KeycardChooser(props) {
  return _react2.default.createElement(
    'div',
    { key: '' + props.localItemInfo.get('index') },
    _react2.default.createElement(_KeyCard2.default
    // key={props.localItemInfo.get('index')}
    , { id: '' + props.localItemInfo.get('index'),
      keycardPictureSrc: props.keycardPictureSrc,
      keycardTypes: props.keycardTypes,
      keycards: props.keycards,
      params: props.params,
      orderitem: props.orderitem,
      changeCardNumber: props.changeCardNumber,
      onChangeCheck: props.onChangeCheck,
      itemFieldsDefinition: props.itemFieldsDefinition,
      popover: props.popover,
      popoverLink: props.popoverLink,
      hasSupport: props.hasSupport,
      localItemInfo: props.localItemInfo,
      updateFieldsErrors: props.updateFieldsErrors,
      deleteKeyFieldsErrors: props.deleteKeyFieldsErrors,
      updateKeycardsMask: props.updateKeycardsMask,
      validateKeycard: props.validateKeycard,
      updateValidatedKeycard: props.updateValidatedKeycard,
      updateValidField: props.updateValidField,
      updateSwissPassElem: props.updateSwissPassElem
    })
  );
};

KeycardChooser.propTypes = {
  keycardPictureSrc: _propTypes2.default.string.isRequired, // keycard picture src
  keycardTypes: _propTypes2.default.object.isRequired, // keycards to display the tabs
  keycards: _propTypes2.default.object.isRequired,
  params: _propTypes2.default.object.isRequired, // generic params
  orderitem: _propTypes2.default.object.isRequired,
  itemFieldsDefinition: _propTypes2.default.object.isRequired,
  popover: _propTypes2.default.object.isRequired, // content for popover info keycard
  popoverLink: _propTypes2.default.object.isRequired, // content for popover link keycard
  localItemInfo: _propTypes2.default.object.isRequired, // current localItem
  changeCardNumber: _propTypes2.default.func.isRequired, // function to change cardnumber of item
  onChangeCheck: _propTypes2.default.func.isRequired, // function to make changes when checking
  updateFieldsErrors: _propTypes2.default.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: _propTypes2.default.func.isRequired, // function to delete key on fields errors
  updateKeycardsMask: _propTypes2.default.func.isRequired, // function to update elements on a keycardsMask
  // validateKeycard: function call api for verification of keycard number
  validateKeycard: _propTypes2.default.func.isRequired,
  // updateValidatedKeycard: function to change boolean value of keycard number
  updateValidatedKeycard: _propTypes2.default.func.isRequired,
  updateValidField: _propTypes2.default.func.isRequired, //
  updateSwissPassElem: _propTypes2.default.func.isRequired,
  hasSupport: _propTypes2.default.bool.isRequired // boolean indicating support element
};

exports.default = KeycardChooser;
//# sourceMappingURL=KeycardChooser.js.map