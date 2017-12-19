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

var _reactstrap = require('reactstrap');

var _CardNumberField = require('../CardNumberField/CardNumberField');

var _CardNumberField2 = _interopRequireDefault(_CardNumberField);

var _keycardsType = require('../../constants/keycardsType');

var tabKeycardType = _interopRequireWildcard(_keycardsType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './keyCardArea.scss';

/**
 * Keycard area
 */
var KeyCardArea = function (_React$Component) {
  _inherits(KeyCardArea, _React$Component);

  _createClass(KeyCardArea, null, [{
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

  function KeyCardArea(props) {
    _classCallCheck(this, KeyCardArea);

    var _this = _possibleConstructorReturn(this, (KeyCardArea.__proto__ || Object.getPrototypeOf(KeyCardArea)).call(this, props));

    _this.state = {
      checkYes: !props.hasSupport,
      checkNo: props.hasSupport,
      popoverQuestionOpen: false,
      popoverLinkOpen: false,
      hasSupport: props.hasSupport,
      typeKeyCard: ''
    };
    _this.handleChangeCardNumber = _this.handleChangeCardNumber.bind(_this);
    _this.handleChangeAutoSuggestCardNumber = _this.handleChangeAutoSuggestCardNumber.bind(_this);
    _this.changeStatePopoverOpen = _this.changeStatePopoverOpen.bind(_this);
    _this.changeStatePopoverLinkOpen = _this.changeStatePopoverLinkOpen.bind(_this);
    return _this;
  }

  /**
   * Change local state when click on yes
   */


  _createClass(KeyCardArea, [{
    key: 'handleClickCheckYes',
    value: function handleClickCheckYes() {
      this.setState({
        checkYes: true,
        checkNo: false,
        hasSupport: false
      });
      this.props.onChangeCheck('yes');
    }

    /**
     * Change local state when click on no
     */

  }, {
    key: 'handleClickCheckNo',
    value: function handleClickCheckNo() {
      this.setState({
        checkYes: false,
        checkNo: true,
        hasSupport: true
      });
      this.props.onChangeCheck('no');
    }

    /**
     * Change local state for open popover question
     */

  }, {
    key: 'changeStatePopoverOpen',
    value: function changeStatePopoverOpen() {
      this.setState({ popoverQuestionOpen: !this.state.popoverQuestionOpen });
    }

    /**
     * Change local state for open popover link
     */

  }, {
    key: 'changeStatePopoverLinkOpen',
    value: function changeStatePopoverLinkOpen() {
      this.setState({ popoverLinkOpen: !this.state.popoverLinkOpen });
    }

    /**
     * Change card number
     * @param event
     * @param cardId
     */

  }, {
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
     * Display labels for inputs - select active input
     * @param card
     * @param index
     * @returns {XML}
     */

  }, {
    key: 'renderedLabelTab',
    value: function renderedLabelTab(card, index) {
      var _this3 = this;

      var aux = 'card' + index;
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
              _this3.props.updateKeycardsMask(_this3.props.localItemInfo.get('id'), 'idCard', index);
            }
          },
          card
        )
      );
    }

    /**
     *
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

      switch (card) {
        case tabKeycardType.sd:
          {
            if (cardNumber.length < 25) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
              break;
            }
          };
        case tabKeycardType.ta:
        case tabKeycardType.alfi:
          {
            if (cardNumber.length < 16) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
              break;
            }
          };
        case tabKeycardType.open:
          {
            if (cardNumber.length < 11) {
              this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
              return false;
              break;
            }
          };
        default:
          {
            break;
          };
      }
      return true;
    }

    /**
     *
     * @param card
     * @param index
     * @param keycards
     * @param params
     * @returns {XML}
     */

  }, {
    key: 'renderedSomeInputKeyCards',
    value: function renderedSomeInputKeyCards(card, index, keycards, params) {
      var _this4 = this;

      var className = 'tab-pane fade in';
      var lengthKeycard = false;
      var aux = 'tabKeycardType[card]' + index;
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.message.error.input.empty', defaultMessage: 'empty' });
      var currentId = this.props.localItemInfo.get('id');
      var cardNumber = this.props.localItemInfo.get('keycardsMask').get(card);

      if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
        className = className + ' active';

        if (cardNumber !== '') {
          if (this.verifyLengthKeycard(cardNumber, index, tabKeycardType[card])) {
            this.props.deleteKeyFieldsErrors(currentId, errorKey);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }

        this.props.changeCardNumber(currentId, cardNumber);
        this.props.updateKeycardsMask(currentId, 'current', card);
      }

      return _react2.default.createElement(
        'div',
        { className: className, id: aux, role: 'tabpanel', key: index },
        _react2.default.createElement(_CardNumberField2.default, {
          key: index,
          id: index,
          mode: tabKeycardType[card],
          keycards: keycards,
          handleChangeCardNumber: function handleChangeCardNumber(event) {
            _this4.handleChangeCardNumber(event, index, card);
          },
          onChange: function onChange(event) {
            _this4.handleChangeCardNumber(event, index, card);
          },
          onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
            _this4.handleChangeAutoSuggestCardNumber(cardnumber, index, card);
          },
          cardNumber: cardNumber,
          value: cardNumber,
          params: params
        }),
        cardNumber === '' || lengthKeycard === false ? KeyCardArea.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : ''
      );
    }

    /**
     *
     * @param card
     * @param index
     * @param keycards
     * @param params
     * @returns {XML}
     */

  }, {
    key: 'renderedOneInputKeyCard',
    value: function renderedOneInputKeyCard(card, index, keycards, params) {
      var _this5 = this;

      var lengthKeycard = false;
      var errorKey = 'data.cardNumber';
      var formatMessage = this.props.intl.formatMessage;

      var errorLabel = formatMessage({ id: 'rp.checkout.message.error.input.empty', defaultMessage: 'empty' });
      var currentId = this.props.localItemInfo.get('id');
      var cardNumber = this.props.localItemInfo.get('keycardsMask').get(card);

      this.props.updateKeycardsMask(currentId, 'current', card);

      if (cardNumber !== '') {
        lengthKeycard = this.verifyLengthKeycard(cardNumber, index, tabKeycardType[card]);

        if (lengthKeycard === true) {
          this.props.deleteKeyFieldsErrors(currentId, errorKey);
        }
      } else {
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
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
            _this5.handleChangeCardNumber(event, index, card);
          },
          onChange: function onChange(event) {
            _this5.handleChangeCardNumber(event, index, card);
          },
          onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
            _this5.handleChangeAutoSuggestCardNumber(cardnumber, index, card);
          },
          cardNumber: cardNumber.toUpperCase(),
          value: cardNumber,
          params: params
        }),
        cardNumber === '' || lengthKeycard === false ? KeyCardArea.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : ''
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
    value: function renderedListKeyCard(keycardTypes, keycards, params) {
      var _this6 = this;

      return keycardTypes.size > 1 ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs nav-justified responsive-tabs', role: 'tablist' },
          keycardTypes.map(function (card, index) {
            return _this6.renderedLabelTab(tabKeycardType[card], index);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-content' },
          keycardTypes.map(function (card, index) {
            return _this6.renderedSomeInputKeyCards(card, index, keycards, params);
          })
        )
      ) : keycardTypes.map(function (card, index) {
        return _this6.renderedOneInputKeyCard(card, index, keycards, params);
      });
    }

    /**
     *
     * @param keycardTypes
     * @param keycards
     * @param params
     * @returns {*}
     */

  }, {
    key: 'renderedContentCheckYes',
    value: function renderedContentCheckYes(keycardTypes, keycards, params) {
      return this.state.checkYes ? _react2.default.createElement(
        'div',
        { className: 'msgCheckYes' },
        this.renderedListKeyCard(keycardTypes, keycards, params),
        this.renderedLabelLinkPopover()
      ) : '';
    }

    /**
     * Content for popover link
     * @returns {*}
     */

  }, {
    key: 'renderedLabelLinkPopover',
    value: function renderedLabelLinkPopover() {
      return this.props.popoverLink.get('labelKeycardInfo') !== null ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { href: '#', className: 'infoKeyCard', id: 'PopoverLink', onClick: this.changeStatePopoverLinkOpen },
          _react2.default.createElement(
            'span',
            null,
            this.props.popoverLink.get('labelKeycardInfo')
          )
        ),
        _react2.default.createElement(
          _reactstrap.Popover,
          { placement: 'bottom', isOpen: this.state.popoverLinkOpen, target: 'PopoverLink', toggle: this.changeStatePopoverLinkOpen, className: 'ppPopover' },
          _react2.default.createElement(
            _reactstrap.PopoverHeader,
            { className: 'popover-title ppHeader' },
            this.props.popoverLink.get('popoverTitleKeycardInfo')
          ),
          _react2.default.createElement(
            _reactstrap.PopoverBody,
            { className: 'popover-content ppBody' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-4' },
                _react2.default.createElement('img', { className: 'img-responsive', src: this.props.popoverLink.get('picKeycardInfo'), alt: '' })
              ),
              _react2.default.createElement('div', { className: 'col-xs-8', dangerouslySetInnerHTML: { __html: this.props.popoverLink.get('descKeycardInfo') } })
            )
          )
        )
      ) : '';
    }

    /**
     * Display picture question
     * @returns {XML}
     */

  }, {
    key: 'questionImageSvg',
    value: function questionImageSvg() {
      return _react2.default.createElement(
        'svg',
        { x: '0px',
          y: '0px',
          width: '15px',
          height: '15px',
          viewBox: '0 0 612 612',
          fill: '#B8B8B8'
        },
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z' }),
            _react2.default.createElement('path', { d: 'M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512 c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865 c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102 c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585 c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275 c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259 C315.875,186.187,329.033,191.083,336.962,200.875z' }),
            _react2.default.createElement('path', { d: 'M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306 C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306 S459.64,584.182,306,584.182S27.818,459.64,27.818,306z' }),
            _react2.default.createElement('rect', { x: '274.51', y: '415.214', width: '40.559', height: '42.367' })
          )
        )
      );
    }

    /**
     *
     * @returns {XML}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props = this.props,
          keycardTypes = _props.keycardTypes,
          keycards = _props.keycards,
          params = _props.params,
          itemFieldsDefinition = _props.itemFieldsDefinition,
          popover = _props.popover,
          localItemInfo = _props.localItemInfo;
      var hasSupport = this.state.hasSupport;


      var checkSupportYes = '';
      var checkSupportNo = '';
      if (hasSupport) {
        checkSupportNo = 'checked';
      } else {
        checkSupportYes = 'checked';
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'blockPopover' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.question', defaultMessage: 'I have a card' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'contentPopover' },
            _react2.default.createElement(
              _reactstrap.Button,
              { type: 'button', id: 'Popover1', className: 'contentQuestion', onClick: this.changeStatePopoverOpen },
              this.questionImageSvg()
            ),
            _react2.default.createElement(
              _reactstrap.Popover,
              { placement: 'bottom', isOpen: this.state.popoverQuestionOpen, target: 'Popover1', toggle: this.changeStatePopoverOpen, className: 'ppPopover' },
              _react2.default.createElement(
                _reactstrap.PopoverHeader,
                { className: 'popover-title ppHeader' },
                popover.get('keycardTitle')
              ),
              _react2.default.createElement(
                _reactstrap.PopoverBody,
                { className: 'popover-content ppBody' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-xs-4' },
                    _react2.default.createElement('img', { className: 'img-responsive', src: popover.get('keycardPicture'), alt: 'keycardinfo' })
                  ),
                  _react2.default.createElement('div', { className: 'col-xs-8', dangerouslySetInnerHTML: { __html: popover.get('keycardContent') } })
                )
              )
            )
          ),
          _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'form-group keyCardAreaForm' },
              itemFieldsDefinition.get('keycard').get('forceReloading') === false ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { type: 'radio', id: 'inputCheckYes' + this.props.orderitem.get('id'), name: 'card', checked: checkSupportYes, value: 'yes', onChange: function onChange() {
                    _this7.handleClickCheckYes();
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'inputCheckYes' + this.props.orderitem.get('id'), className: 'keycardChoice' },
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.reponse.yes', defaultMessage: 'yes' })
                ),
                _react2.default.createElement('input', { type: 'radio', id: 'inputCheckNo' + this.props.orderitem.get('id'), name: 'card', value: 'non', checked: checkSupportNo, onChange: function onChange() {
                    _this7.handleClickCheckNo();
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'inputCheckNo' + this.props.orderitem.get('id'), className: 'keycardChoice' },
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.reponse.no', defaultMessage: 'no' })
                )
              ) : this.renderedContentCheckYes(keycardTypes, keycards, params),
              this.renderedContentCheckNo(),
              this.renderedContentCheckYes(keycardTypes, keycards, params)
            )
          )
        )
      );
    }
  }]);

  return KeyCardArea;
}(_react2.default.Component);

KeyCardArea.propTypes = {
  keycardTypes: _propTypes.PropTypes.object.isRequired, // keycards to display the tabs
  keycards: _propTypes.PropTypes.object.isRequired,
  params: _propTypes.PropTypes.object.isRequired, // generic params
  orderitem: _propTypes.PropTypes.object.isRequired,
  itemFieldsDefinition: _propTypes.PropTypes.object.isRequired,
  changeCardNumber: _propTypes.PropTypes.func.isRequired, // function to change cardnumber of item
  intl: _reactIntl.intlShape.isRequired, // for the internationalization
  onChangeCheck: _propTypes.PropTypes.func.isRequired,
  popover: _propTypes.PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: _propTypes.PropTypes.object.isRequired, // content for popover link keycard
  hasSupport: _propTypes.PropTypes.bool.isRequired, // boolean to know if support exists
  localItemInfo: _propTypes.PropTypes.object.isRequired, // current local Item
  updateFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: _propTypes.PropTypes.func.isRequired, // function to delete key on fields errors
  updateKeycardsMask: _propTypes.PropTypes.func.isRequired // function to update elements on a keycardsMask
};

exports.default = (0, _reactIntl.injectIntl)(KeyCardArea);
//# sourceMappingURL=KeyCardArea.js.map