'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _immutable = require('immutable');

var _reactIntl = require('react-intl');

var _CardNumberField = require('../CardNumberField/CardNumberField');

var _CardNumberField2 = _interopRequireDefault(_CardNumberField);

var _keycardsType = require('../../constants/keycardsType');

var tabKeycardType = _interopRequireWildcard(_keycardsType);

var _MaskHelper = require('../../helpers/MaskHelper');

var MaskHelper = _interopRequireWildcard(_MaskHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * One Mask
 */
var OneMask = function (_React$Component) {
  _inherits(OneMask, _React$Component);

  _createClass(OneMask, null, [{
    key: 'renderedErrorInputMessage',

    /**
     * Display Error Message
     * @param errorKey
     * @param localItemInfo
     * @returns {*}
     */
    value: function renderedErrorInputMessage(errorKey, localItemInfo) {
      var error = localItemInfo.get('errors', new _immutable.Map()).get(errorKey, '');

      return error.length === 0 ? null : _react2.default.createElement(
        'span',
        { className: 'errorInputKeyCard' },
        error
      );
    }

    /**
     * Constructor
     * @param props
     */

  }]);

  function OneMask(props) {
    _classCallCheck(this, OneMask);

    var _this = _possibleConstructorReturn(this, (OneMask.__proto__ || Object.getPrototypeOf(OneMask)).call(this, props));

    _this.handleChangeCardNumber = _this.handleChangeCardNumber.bind(_this);
    _this.handleChangeAutoSuggestCardNumber = _this.handleChangeAutoSuggestCardNumber.bind(_this);
    return _this;
  }

  /**
   * Change card number
   * @param event
   * @param cardId
   */


  _createClass(OneMask, [{
    key: 'handleChangeCardNumber',
    value: function handleChangeCardNumber(event, cardId, card) {
      this.handleChangeAutoSuggestCardNumber(event.target.value, cardId, card, false);
    }

    /**
     *
     * @param cardnumber
     * @param cardId
     */

  }, {
    key: 'handleChangeAutoSuggestCardNumber',
    value: function handleChangeAutoSuggestCardNumber(cardnumber, cardId, card) {
      var _this2 = this;

      var suggest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var newValue = '';
      this.props.localItemInfo.get('keycardsMask').forEach(function (item, key) {
        if (key !== 'current' && key !== 'idCard' && key !== card) {
          if (suggest) {
            _this2.props.keycards.forEach(function (item, key) {
              if (item.get('shortnumber') === cardnumber || item.get('cardnumber') === cardnumber) {
                newValue = card === 'sd' ? item.get('shortnumber') : item.get('cardnumber');
              }
            });
            _this2.props.updateKeycardsMask(_this2.props.orderitem.get('id'), key, newValue);
          } else {
            _this2.props.updateKeycardsMask(_this2.props.orderitem.get('id'), key, newValue);
          }
        }
      });

      if (typeof cardnumber !== 'undefined') {
        this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
        this.props.updateKeycardsMask(this.props.orderitem.get('id'), card, cardnumber);
      }
    }

    /**
     * Function to check the length of the card number entered according to the type of card
     * @param cardNumber
     * @param index
     * @param card
     * @returns {boolean}
     */

  }, {
    key: 'verifyLengthKeycard',
    value: function verifyLengthKeycard(cardnumber, index, card) {
      var reg = new RegExp(/( )|(_)/g);
      var cardNumber = cardnumber.replace(reg, '');
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.length', defaultMessage: 'no lenght' });
      var currentId = this.props.localItemInfo.get('id');

      // verification the card type
      switch (card) {
        case tabKeycardType.sd:
          {
            if (cardNumber.length < 25) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
            }
            break;
          }
        case tabKeycardType.ta:
        case tabKeycardType.alfi:
          {
            if (cardNumber.length < 16) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
            }
            break;
          }
        case tabKeycardType.open:
          {
            if (cardNumber.length < 11) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
            }
            break;
          }
        default:
          {
            break;
          }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          keycards = _props.keycards,
          params = _props.params,
          card = _props.card,
          index = _props.index,
          localItemInfo = _props.localItemInfo,
          updateKeycardsMask = _props.updateKeycardsMask,
          deleteKeyFieldsErrors = _props.deleteKeyFieldsErrors,
          updateFieldsErrors = _props.updateFieldsErrors;


      var validKeycard = false;
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'empty' });
      var currentId = localItemInfo.get('id');
      var cardNumber = localItemInfo.get('keycardsMask').get(card);

      updateKeycardsMask(currentId, 'current', card);

      if (cardNumber !== '') {
        validKeycard = MaskHelper.verifyKeycard(cardNumber, index, tabKeycardType[card]);
        if (validKeycard) {
          deleteKeyFieldsErrors(currentId, errorKey);
        }
      } else {
        updateFieldsErrors(currentId, errorKey, errorLabel);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_CardNumberField2.default, {
          key: index,
          id: index,
          mode: tabKeycardType[card],
          keycards: keycards,
          handleChangeCardNumber: function handleChangeCardNumber(event) {
            _this3.handleChangeCardNumber(event, index, card);
          },
          onChange: function onChange(event) {
            _this3.handleChangeCardNumber(event, index, card);
          },
          onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
            _this3.handleChangeAutoSuggestCardNumber(cardnumber, index, card);
          },
          cardNumber: cardNumber.toUpperCase(),
          value: cardNumber,
          params: params
        }),
        cardNumber === '' || validKeycard === false ? OneMask.renderedErrorInputMessage(errorKey, localItemInfo) : ''
      );
    }
  }]);

  return OneMask;
}(_react2.default.Component);

OneMask.propTypes = {
  keycards: _propTypes.PropTypes.object.isRequired,
  params: _propTypes.PropTypes.object.isRequired, // generic params
  localItemInfo: _propTypes.PropTypes.object.isRequired, // current local Item
  orderitem: _propTypes.PropTypes.object.isRequired,
  changeCardNumber: _propTypes.PropTypes.func.isRequired, // function to change cardnumber of item
  updateKeycardsMask: _propTypes.PropTypes.func.isRequired, // function to update elements on a keycardsMask
  deleteKeyFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to delete key on fields errors
  updateFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to update fields errors,
  card: _propTypes.PropTypes.string.isRequired,
  index: _propTypes.PropTypes.number.isRequired,
  intl: _reactIntl.intlShape.isRequired // for the internationalization
};

exports.default = (0, _reactIntl.injectIntl)(OneMask);
//# sourceMappingURL=OneMask.js.map