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

var _CardTypeHelper = require('../../helpers/CardTypeHelper');

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
    _this.handleChangeCheckSwisspass = _this.handleChangeCheckSwisspass.bind(_this);
    _this.handleChangeZipcode = _this.handleChangeZipcode.bind(_this);
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
     *
     * @param event
     * @param type
     */

  }, {
    key: 'handleChangeCardNumber',
    value: function handleChangeCardNumber(event, type) {
      this.handleChangeAutoSuggestCardNumber(event.target.value, type, false);
    }

    /**
     * handle Change Check Swisspass
     */

  }, {
    key: 'handleChangeCheckSwisspass',
    value: function handleChangeCheckSwisspass() {
      var type = 'swisspass';
      var property = 'checked';
      var currentId = this.props.localItemInfo.get('skierIndex');
      var newValue = !(0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, type, property);

      this.props.stateUpdateCardNumberTypeProperty(currentId, type, property, newValue);

      if ((0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'formatValid') && (0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'zipcodeFormatValid') && newValue) {
        var cardNumber = (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'number');
        var zipCode = (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'zipcode');
        this.props.validateKeycard(currentId, cardNumber, zipCode);
      }
    }

    /**
     * handle Change Zipcode
     * @param event
     */

  }, {
    key: 'handleChangeZipcode',
    value: function handleChangeZipcode(event) {
      var type = 'swisspass';
      var zipCode = event.target.value;
      var errorKey = 'data.swisspass.zipcode';

      var currentId = this.props.localItemInfo.get('skierIndex');
      this.props.stateUpdateCardNumberTypeProperty(currentId, type, 'zipcode', zipCode);

      var pattern = /^[0-9]{4}$/;
      var isValid = pattern.test(zipCode);
      this.props.stateUpdateCardNumberTypeProperty(currentId, type, 'zipcodeFormatValid', isValid);

      // Delete errors
      this.props.deleteKeyFieldsErrors(currentId, errorKey);

      if (!isValid) {
        var formatMessage = this.props.intl.formatMessage;

        var errorLabel = formatMessage({ id: 'rp.checkout.customize.swisspass.zipcode.invalid', defaultMessage: 'invalid' });
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
      } else if ((0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'formatValid') && (0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'checked')) {
        var cardNumber = (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'number');
        this.props.validateKeycard(currentId, cardNumber, zipCode);
      }
    }

    /**
     *
     * @param cardnumber
     * @param type
     * @param suggest
     */

  }, {
    key: 'handleChangeAutoSuggestCardNumber',
    value: function handleChangeAutoSuggestCardNumber(cardnumber, type) {
      var _this2 = this;

      var suggest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var newValue = '';
      var formatMessage = this.props.intl.formatMessage;

      var errorKey = 'data.cardNumber';
      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'invalid' });
      var currentId = this.props.localItemInfo.get('skierIndex');
      var skierIndex = this.props.orderitem.get('skierIndex');

      var validKeycard = (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, type, 'formatValid');

      if (cardnumber !== undefined && typeof cardnumber !== 'undefined') {
        // Remove spaces on card number
        cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');

        // Update others card types values
        (0, _CardTypeHelper.getCardNumberTypes)(this.props.localItemInfo).forEach(function (item, key) {
          if (![type, 'swisspass'].includes(key)) {
            if (suggest) {
              _this2.props.keycards.forEach(function (element) {
                if (element.get('shortnumber') === cardnumber || element.get('cardnumber') === cardnumber) {
                  newValue = type === 'sd' ? element.get('shortnumber') : element.get('cardnumber');
                }
              });
            }
            _this2.props.stateUpdateCardNumberTypeProperty(skierIndex, key, 'number', newValue);
          }
        });

        // Delete errors
        this.props.deleteKeyFieldsErrors(currentId, errorKey);

        var cardType = tabKeycardType[type];
        var isSwissPass = (0, _CardTypeHelper.isCurrentCardNumberType)(this.props.localItemInfo, 'swisspass');

        // verification keycard number is correct
        if (cardnumber !== '' || cardnumber !== undefined) {
          validKeycard = MaskHelper.verifyKeycard(cardnumber, cardType);

          this.props.stateUpdateCardNumberTypeProperty(skierIndex, type, 'formatValid', validKeycard);
          this.changeValidationCard(validKeycard);

          // Keycard mask is valid
          if (validKeycard) {
            // If no swisspass, we can validate keycard
            if (!isSwissPass) {
              this.props.validateKeycard(currentId, cardnumber);
            } else if ((0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'zipcodeFormatValid') && (0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'checked')) {
              var zipCode = (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'zipcode');
              this.props.validateKeycard(currentId, cardnumber, zipCode);
            }
          } else {
            this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }

        // Save cardNumber value
        this.props.stateUpdateCardNumberTypeProperty(skierIndex, type, 'number', cardnumber);
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
     * Render keycard types content (choice or not)
     *
     * @param keycardTypes
     * @returns {XML}
     */

  }, {
    key: 'renderedKeyCardTypesContent',
    value: function renderedKeyCardTypesContent(keycardTypes) {
      var _this3 = this;

      return keycardTypes.size > 1 ? // Display Double Mask KeyCard
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs nav-justified responsive-tabs', role: 'tablist' },
          keycardTypes.map(function (data, type) {
            return _this3.renderedLabelTab(tabKeycardType[type], type);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-content' },
          keycardTypes.map(function (data, type) {
            return _this3.renderedSomeInputKeyCards(type);
          })
        )
      ) :
      // Display one Input for keyCard
      this.renderedInputOneKeyCard(keycardTypes.first());
    }

    /**
     * Display of the simple input mask
     *
     * @param type
     * @returns {*}
     */

  }, {
    key: 'renderedInputOneKeyCard',
    value: function renderedInputOneKeyCard(type) {
      var validKeycard = false;
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'empty' });
      var currentId = this.props.localItemInfo.get('skierIndex');
      var cardNumber = (0, _CardTypeHelper.getCurrentCardNumberValue)(this.props.localItemInfo);

      if (cardNumber === null || typeof cardNumber === 'undefined') {
        cardNumber = '';
      }

      // Change current cardNumber type
      this.props.updateCurrentCardNumberType(currentId, type);
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
        { key: type },
        this.renderedCardNumberField(type, cardNumber),
        this.state.checkYes ? this.renderedLabelLinkPopover() : '',
        cardNumber === '' || !(0, _CardTypeHelper.isCurrentCardNumberValid)(this.props.localItemInfo) ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : ''
      );
    }

    /**
     * Display labels for inputs - select active input
     * @returns {XML}
     * @param textType
     * @param type
     */

  }, {
    key: 'renderedLabelTab',
    value: function renderedLabelTab(textType, type) {
      var _this4 = this;

      var className = 'nav-item';
      if ((0, _CardTypeHelper.isCurrentCardNumberType)(this.props.localItemInfo, type)) {
        className = className + ' active';
      }

      return _react2.default.createElement(
        'li',
        { className: className, key: type },
        _react2.default.createElement(
          'a',
          {
            className: 'nav-link text-center',
            'data-toggle': 'tab',
            role: 'tab',
            href: 'type' + type,
            onClick: function onClick() {
              // Change current cardNumber type
              _this4.props.updateCurrentCardNumberType(_this4.props.localItemInfo.get('skierIndex'), type);
            }
          },
          textType
        )
      );
    }

    /**
     * Display of the double input mask
     *
     * @param type
     * @returns {XML}
     */

  }, {
    key: 'renderedSomeInputKeyCards',
    value: function renderedSomeInputKeyCards(type) {
      var className = 'tab-pane fade in';
      var aux = 'tabKeycardType[type]' + type;
      var errorKey = 'data.cardNumber';
      var cardNumber = (0, _CardTypeHelper.getCurrentCardNumberValue)(this.props.localItemInfo);

      if (cardNumber === null || typeof cardNumber === 'undefined') {
        cardNumber = '';
      }

      // Remove spaces on card number
      cardNumber = cardNumber.replace(new RegExp(/( )|(_)/g), '');

      var isCurrentType = (0, _CardTypeHelper.isCurrentCardNumberType)(this.props.localItemInfo, type);

      // active tab on select
      if (isCurrentType) {
        className = className + ' active';
      }

      return _react2.default.createElement(
        'div',
        { className: className, id: aux, role: 'tabpanel', key: type },
        this.renderedCardNumberField(type, cardNumber),
        this.state.checkYes ? this.renderedLabelLinkPopover() : '',
        cardNumber === '' || !(0, _CardTypeHelper.isCurrentCardNumberValid)(this.props.localItemInfo) ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : '',
        (0, _CardTypeHelper.isCurrentCardNumberType)(this.props.localItemInfo, 'swisspass') ? this.renderedContentForSwisspass() : null
      );
    }

    /**
     * Render a cardNumber field
     *
     * @param type
     * @param cardNumber
     */

  }, {
    key: 'renderedCardNumberField',
    value: function renderedCardNumberField(type, cardNumber) {
      var _this5 = this;

      return _react2.default.createElement(_CardNumberField2.default, {
        key: type,
        id: type,
        validInput: this.state.valid,
        mode: tabKeycardType[type],
        keycards: this.props.keycards,
        handleChangeCardNumber: function handleChangeCardNumber(event) {
          _this5.handleChangeCardNumber(event, type);
        },
        onChange: function onChange(event) {
          _this5.handleChangeCardNumber(event, type);
        },
        onAutoSuggestSelected: function onAutoSuggestSelected(number) {
          _this5.handleChangeAutoSuggestCardNumber(number, type);
        },
        cardNumber: cardNumber,
        value: cardNumber,
        params: this.props.params
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

    /**
     *
     * @returns {null}
     */

  }, {
    key: 'renderedContentForSwisspass',
    value: function renderedContentForSwisspass() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        { className: 'contentSwisspass' },
        _react2.default.createElement('input', {
          type: 'text',
          name: 'zipcode-swiss',
          id: 'zipcode-swiss',
          className: 'form-control',
          maxLength: '4',
          'data-control': 'true',
          onChange: function onChange(event) {
            return _this6.handleChangeZipcode(event);
          },
          value: (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'zipcode')
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'zipcode-swiss' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.shippingaddress.zipcode', defaultMessage: 'Zipcode' })
        ),
        !(0, _CardTypeHelper.isSwissPassPropertyValid)(this.props.localItemInfo, 'zipcodeFormatValid') ? KeyCard.renderedErrorInputMessage('data.swisspass.zipcode', this.props.localItemInfo) : '',
        _react2.default.createElement('input', {
          type: 'checkbox'
          // value={CardTypeHelper.getSwissPassProperty(this.props.localItemInfo, 'checked') === true ? '1' : '0'}
          , checked: (0, _CardTypeHelper.getCardNumberTypeElementProperty)(this.props.localItemInfo, 'swisspass', 'checked'),
          name: 'check-swisspass',
          id: 'check-swisspass'
          // onChange={() => this.handleChangeCheckSwisspass()}
          , onClick: function onClick() {
            return _this6.handleChangeCheckSwisspass();
          }
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'check-swisspass', onChange: function onChange() {
              return _this6.handleChangeCheckSwisspass();
            } },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.swisspass.check.text', defaultMessage: 'I agree with the conditions of SwissPass' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn-swisspass' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.swisspass.link', defaultMessage: 'Disclaimer' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props = this.props,
          id = _props.id,
          keycardPictureSrc = _props.keycardPictureSrc,
          keycardTypes = _props.keycardTypes,
          fields = _props.fields,
          popover = _props.popover;
      var hasSupport = this.state.hasSupport;


      return _react2.default.createElement(
        'div',
        { className: 'blockPopover', key: id },
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
                fields.get('cardNumber').get('hasSupport', false) === true ? _react2.default.createElement(_reactToggleSwitch2.default, {
                  on: !hasSupport,
                  onClick: function onClick() {
                    _this7.handleChangeToggle(hasSupport);
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
                  this.renderedKeyCardTypesContent(keycardTypes)
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
  fields: _propTypes.PropTypes.object.isRequired,
  popover: _propTypes.PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: _propTypes.PropTypes.object.isRequired, // content for popover link keycard
  localItemInfo: _propTypes.PropTypes.object.isRequired, // current local Item
  onChangeCheck: _propTypes.PropTypes.func.isRequired, // function to make changes when checking
  updateFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to delete key on fields errors
  updateCurrentCardNumberType: _propTypes.PropTypes.func.isRequired, // function to update current cardNumber type
  // validateKeycard: function call api for verification of keycard number
  validateKeycard: _propTypes.PropTypes.func.isRequired,
  updateValidField: _propTypes.PropTypes.func.isRequired, //
  hasSupport: _propTypes.PropTypes.bool.isRequired, // boolean to know if support exists
  intl: _reactIntl.intlShape.isRequired, // for the internationalization
  stateUpdateCardNumberTypeProperty: _propTypes.PropTypes.func.isRequired // function to update cardNumber property value
};

exports.default = (0, _reactIntl.injectIntl)(KeyCard);
//# sourceMappingURL=KeyCard.js.map