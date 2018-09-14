'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactIntl = require('react-intl');

var _immutable = require('immutable');

var _reactToggleSwitch = require('react-toggle-switch');

var _reactToggleSwitch2 = _interopRequireDefault(_reactToggleSwitch);

require('react-toggle-switch/dist/css/switch.min.css');

var _PopoverQuestion = require('../PopoverQuestion/PopoverQuestion');

var _PopoverQuestion2 = _interopRequireDefault(_PopoverQuestion);

var _PopoverLink = require('../PopoverLink/PopoverLink');

var _PopoverLink2 = _interopRequireDefault(_PopoverLink);

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
 * Keycard
 */
var KeyCard = function (_React$Component) {
  _inherits(KeyCard, _React$Component);

  _createClass(KeyCard, null, [{
    key: 'renderedErrorInputMessage',

    /**
     * Display Error Message
     * @param errorKey
     * @param localItemInfo
     * @returns {*}
     */
    value: function renderedErrorInputMessage(errorKey, localItemInfo) {
      var error = localItemInfo.get('errors', new _immutable.Map()).get(errorKey, '');
      return _react2.default.createElement(
        'p',
        { className: 'errorInputKeyCard' },
        error
      );
    }
    /**
     * Constructor
     * @param props
     */

  }]);

  function KeyCard(props) {
    _classCallCheck(this, KeyCard);

    var _this = _possibleConstructorReturn(this, (KeyCard.__proto__ || Object.getPrototypeOf(KeyCard)).call(this, props));

    _this.state = {
      checkYes: !props.hasSupport,
      checkNo: props.hasSupport,
      hasSupport: props.hasSupport,
      valid: true
    };
    _this.handleChangeCardNumber = _this.handleChangeCardNumber.bind(_this);
    _this.handleChangeAutoSuggestCardNumber = _this.handleChangeAutoSuggestCardNumber.bind(_this);
    _this.changeValidationCard = _this.changeValidationCard.bind(_this);
    return _this;
  }

  /**
   * Change local state when click support change value
   * @param checked
   */


  _createClass(KeyCard, [{
    key: 'handleChangeToggle',
    value: function handleChangeToggle(checked) {
      this.setState({
        checkYes: checked,
        checkNo: !checked,
        hasSupport: !checked
      });
      this.props.onChangeCheck(checked ? 'yes' : 'no');
    }

    /**
     * Change card number
     * @param event
     * @param cardId
     */

  }, {
    key: 'handleChangeCardNumber',
    value: function handleChangeCardNumber(event, cardId, type) {
      this.handleChangeAutoSuggestCardNumber(event.target.value, cardId, type, false);
    }

    /**
     *
     * @param cardnumber
     * @param cardId
     */

  }, {
    key: 'handleChangeAutoSuggestCardNumber',
    value: function handleChangeAutoSuggestCardNumber(cardnumber, cardId, type) {
      var _this2 = this;

      var suggest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var newValue = '';
      var validKeycard = this.props.localItemInfo.get('validateKeycard');
      var formatMessage = this.props.intl.formatMessage;

      var errorKey = 'data.cardNumber';
      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'invalid' });
      var currentId = this.props.localItemInfo.get('skierIndex');

      if (cardnumber !== undefined) {
        // Remove spaces on card number
        cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');

        // Update others card types values
        this.props.localItemInfo.get('keycardsMask').forEach(function (item, key) {
          if (key !== 'current' && key !== 'idCard' && key !== type) {
            if (suggest) {
              _this2.props.keycards.forEach(function (element) {
                if (element.get('shortnumber') === cardnumber || element.get('cardnumber') === cardnumber) {
                  newValue = type === 'sd' ? element.get('shortnumber') : element.get('cardnumber');
                }
              });
            }
            _this2.props.updateKeycardsMask(_this2.props.orderitem.get('skierIndex'), key, newValue);
          }
        });
        // verification keycard number is correct
        if (cardnumber !== '' || cardnumber !== undefined) {
          validKeycard = MaskHelper.verifyKeycard(cardnumber, cardId, tabKeycardType[type]);
          this.props.updateValidatedKeycard(currentId, validKeycard);
          this.props.updateValidField(currentId, 'cardNumber', validKeycard);
          this.changeValidationCard(validKeycard);

          if (validKeycard) {
            this.props.validateKeycard(currentId, cardnumber);
          } else {
            this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }
        // Update current card type value
        // if (typeof cardnumber !== 'undefined') {
        this.props.changeCardNumber(this.props.orderitem.get('skierIndex'), cardnumber);
        this.props.updateKeycardsMask(this.props.orderitem.get('skierIndex'), type, cardnumber);
        // }
      }
    }

    /**
     *
     * @param value
     */

  }, {
    key: 'changeValidationCard',
    value: function changeValidationCard(value) {
      this.setState({ valid: value });
    }

    /**
     * Content for popover link
     * @returns {*}
     */

  }, {
    key: 'renderedLabelLinkPopover',
    value: function renderedLabelLinkPopover() {
      return this.props.popoverLink.get('labelKeycardInfo') !== null ? _react2.default.createElement(_PopoverLink2.default, { popoverLink: this.props.popoverLink, index: this.props.orderitem.get('skierIndex') }) : '';
    }

    /**
     *
     * @param index
     * @param type
     * @param cardNumber
     * @param errorKey
     * @param className
     */

  }, {
    key: 'renderedCardNumberField',
    value: function renderedCardNumberField(index, type, cardNumber) {
      var _this3 = this;

      return _react2.default.createElement(_CardNumberField2.default, {
        key: index,
        id: index,
        validInput: this.state.valid,
        mode: tabKeycardType[type],
        keycards: this.props.keycards,
        handleChangeCardNumber: function handleChangeCardNumber(event) {
          _this3.handleChangeCardNumber(event, index, type);
        },
        onChange: function onChange(event) {
          _this3.handleChangeCardNumber(event, index, type);
        },
        onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
          _this3.handleChangeAutoSuggestCardNumber(cardnumber, index, type);
        },
        cardNumber: cardNumber,
        value: cardNumber,
        params: this.props.params
      });
    }

    /**
     * Display of the double input mask
     * @param card
     * @param index
     * @param keycards
     * @param params
     * @returns {XML}
     */

  }, {
    key: 'renderedSomeInputKeyCards',
    value: function renderedSomeInputKeyCards(type, index) {
      var className = 'tab-pane fade in';
      var aux = 'tabKeycardType[type]' + index;
      var currentId = this.props.localItemInfo.get('skierIndex');
      var errorKey = 'data.cardNumber';
      var cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);

      if (cardNumber === null) {
        cardNumber = '';
      }

      // Remove spaces on card number
      cardNumber = cardNumber.replace(new RegExp(/( )|(_)/g), '');

      // active tab on select
      if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
        className = className + ' active';
        this.props.changeCardNumber(currentId, cardNumber);
        this.props.updateKeycardsMask(currentId, 'current', type);
      }

      return _react2.default.createElement(
        'div',
        { className: className, id: aux, role: 'tabpanel', key: index },
        this.renderedCardNumberField(index, type, cardNumber),
        this.state.checkYes ? this.renderedLabelLinkPopover() : '',
        cardNumber === '' || this.props.localItemInfo.get('validateKeycard') === false ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : ''
      );
    }

    /**
     * Display of the simple input mask
     * @param type
     * @param index
     * @returns {*}
     */

  }, {
    key: 'renderedInputOneKeyCard',
    value: function renderedInputOneKeyCard(type, index) {
      var validKeycard = false;
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'empty' });
      var currentId = this.props.localItemInfo.get('skierIndex');
      var cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);

      if (cardNumber === null) {
        cardNumber = '';
      }

      this.props.updateKeycardsMask(currentId, 'current', type);
      /*
          if (cardNumber !== '') {
            validKeycard = MaskHelper.verifyKeycard(cardNumber, index, tabKeycardType[type]);
            if (validKeycard) {
              this.props.validateKeycard(currentId, cardNumber);
              this.props.deleteKeyFieldsErrors(currentId, errorKey);
            }
          } else {
            this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          }
      */
      return _react2.default.createElement(
        'div',
        { key: index },
        this.renderedCardNumberField(index, type, cardNumber),
        this.state.checkYes ? this.renderedLabelLinkPopover() : '',
        cardNumber === '' || this.props.localItemInfo.get('validateKeycard') === false ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : ''
      );
    }

    /**
     * Display labels for inputs - select active input
     * @param card
     * @param index
     * @returns {XML}
     */

  }, {
    key: 'renderedLabelTab',
    value: function renderedLabelTab(type, index) {
      var _this4 = this;

      var aux = 'type' + index;
      var className = 'nav-item';

      if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
        className = className + ' active';
      }

      return _react2.default.createElement(
        'li',
        { className: className, key: index },
        _react2.default.createElement(
          'a',
          {
            className: 'nav-link text-center',
            'data-toggle': 'tab',
            role: 'tab',
            href: aux,
            onClick: function onClick() {
              _this4.props.updateKeycardsMask(_this4.props.localItemInfo.get('skierIndex'), 'idCard', index);
            }
          },
          type
        )
      );
    }

    /**
     *
     * @param keycardTypes
     * @param keycards
     * @param params
     * @returns {XML}
     */

  }, {
    key: 'renderedListKeyCard',
    value: function renderedListKeyCard(keycardTypes) {
      var _this5 = this;

      return keycardTypes.size > 1 ? // Display Double Mask KeyCard
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs nav-justified responsive-tabs', role: 'tablist' },
          keycardTypes.map(function (type, index) {
            return _this5.renderedLabelTab(tabKeycardType[type], index);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-content' },
          keycardTypes.map(function (type, index) {
            return _this5.renderedSomeInputKeyCards(type, index);
          })
        )
      ) : keycardTypes.map(function (type, index) {
        return (// Display one Input for keyCard
          _this5.renderedInputOneKeyCard(type, index)
        );
      });
    }

    /**
     * Display content checked no
     * @returns {*}
     */

  }, {
    key: 'renderedContentCheckNo',
    value: function renderedContentCheckNo() {
      return this.state.checkNo ? _react2.default.createElement(
        'div',
        { className: 'msgCheckNo' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.ordercustom.nokeycard', defaultMessage: 'no card' })
        )
      ) : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      console.log('Keycardchooser keycard');
      var _props = this.props,
          id = _props.id,
          keycardPictureSrc = _props.keycardPictureSrc,
          keycardTypes = _props.keycardTypes,
          itemFieldsDefinition = _props.itemFieldsDefinition,
          popover = _props.popover;
      var hasSupport = this.state.hasSupport;


      return _react2.default.createElement(
        'div',
        { className: 'blockPopover test yeimi', key: id },
        _react2.default.createElement(
          'span',
          null,
          'Johnny'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-4 keyCardAreaImage' },
          _react2.default.createElement('img', { src: keycardPictureSrc, alt: 'keycardPicture' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { className: 'col-xs-12' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'keycard_area_title' },
                _react2.default.createElement(
                  'div',
                  { className: 'keycardMessage' },
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.question', defaultMessage: 'I have a card' }),
                  _react2.default.createElement(_PopoverQuestion2.default, { popover: popover, index: this.props.orderitem.get('skierIndex') })
                ),
                itemFieldsDefinition.get('keycard').get('hasSupport', false) === true ? _react2.default.createElement(_reactToggleSwitch2.default, {
                  on: !hasSupport,
                  onClick: function onClick() {
                    _this6.handleChangeToggle(hasSupport);
                  }
                }) : ''
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'col-xs-8 form-group keyCardAreaForm' },
                this.renderedContentCheckNo(),
                this.state.checkYes ? _react2.default.createElement(
                  'div',
                  { className: 'msgCheckYes' },
                  this.renderedListKeyCard(keycardTypes)
                ) : ''
              )
            )
          )
        )
      );
    }
  }]);

  return KeyCard;
}(_react2.default.Component);

KeyCard.propTypes = {
  id: _propTypes.PropTypes.string.isRequired, // index
  keycardPictureSrc: _propTypes.PropTypes.string.isRequired, // keycard picture src
  keycardTypes: _propTypes.PropTypes.object.isRequired, // keycards to display the tabs
  keycards: _propTypes.PropTypes.object.isRequired,
  params: _propTypes.PropTypes.object.isRequired, // generic params
  orderitem: _propTypes.PropTypes.object.isRequired,
  itemFieldsDefinition: _propTypes.PropTypes.object.isRequired,
  popover: _propTypes.PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: _propTypes.PropTypes.object.isRequired, // content for popover link keycard
  localItemInfo: _propTypes.PropTypes.object.isRequired, // current local Item
  changeCardNumber: _propTypes.PropTypes.func.isRequired, // function to change cardnumber of item
  onChangeCheck: _propTypes.PropTypes.func.isRequired, // function to make changes when checking
  updateFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to delete key on fields errors
  updateKeycardsMask: _propTypes.PropTypes.func.isRequired, // function to update elements on a keycardsMask
  // validateKeycard: function call api for verification of keycard number
  validateKeycard: _propTypes.PropTypes.func.isRequired,
  // updateValidatedKeycard: function to change boolean value of keycard number
  updateValidatedKeycard: _propTypes.PropTypes.func.isRequired,
  updateOverlay: _propTypes.PropTypes.func.isRequired, // function for display overlay
  updateValidField: _propTypes.PropTypes.func.isRequired, //
  hasSupport: _propTypes.PropTypes.bool.isRequired, // boolean to know if support exists
  intl: _reactIntl.intlShape.isRequired // for the internationalization
};

exports.default = (0, _reactIntl.injectIntl)(KeyCard);
//# sourceMappingURL=KeyCard.js.map