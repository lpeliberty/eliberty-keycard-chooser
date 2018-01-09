'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactIntl = require('react-intl');

var _PopoverQuestion = require('../PopoverQuestion/PopoverQuestion');

var _PopoverQuestion2 = _interopRequireDefault(_PopoverQuestion);

var _PopoverLink = require('../PopoverLink/PopoverLink');

var _PopoverLink2 = _interopRequireDefault(_PopoverLink);

var _OneMask = require('../OneMask/OneMask');

var _OneMask2 = _interopRequireDefault(_OneMask);

var _DoubleMask = require('../DoubleMask/DoubleMask');

var _DoubleMask2 = _interopRequireDefault(_DoubleMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './keyCard.scss';

/**
 * Keycard
 */
var KeyCard = function (_React$Component) {
  _inherits(KeyCard, _React$Component);

  /**
   * Constructor
   * @param props
   */
  function KeyCard(props) {
    _classCallCheck(this, KeyCard);

    var _this = _possibleConstructorReturn(this, (KeyCard.__proto__ || Object.getPrototypeOf(KeyCard)).call(this, props));

    _this.state = {
      checkYes: !props.hasSupport,
      checkNo: props.hasSupport,
      hasSupport: props.hasSupport
    };
    return _this;
  }

  /**
   * Change local state when click on yes
   */


  _createClass(KeyCard, [{
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
     * Content for popover link
     * @returns {*}
     */

  }, {
    key: 'renderedLabelLinkPopover',
    value: function renderedLabelLinkPopover() {
      return this.props.popoverLink.get('labelKeycardInfo') !== null ? _react2.default.createElement(_PopoverLink2.default, { popoverLink: this.props.popoverLink }) : '';
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
      var _this2 = this;

      return keycardTypes.size > 1 ? _react2.default.createElement(_DoubleMask2.default, {
        keycards: this.props.keycards,
        keycardTypes: keycardTypes,
        params: this.props.params,
        localItemInfo: this.props.localItemInfo,
        updateKeycardsMask: this.props.updateKeycardsMask,
        deleteKeyFieldsErrors: this.props.deleteKeyFieldsErrors,
        updateFieldsErrors: this.props.updateFieldsErrors,
        orderitem: this.props.orderitem,
        changeCardNumber: this.props.changeCardNumber
      }) : keycardTypes.map(function (card, index) {
        return _react2.default.createElement(_OneMask2.default, {
          card: card,
          index: index,
          keycards: _this2.props.keycards,
          params: _this2.props.params,
          localItemInfo: _this2.props.localItemInfo,
          updateKeycardsMask: _this2.props.updateKeycardsMask,
          deleteKeyFieldsErrors: _this2.props.deleteKeyFieldsErrors,
          updateFieldsErrors: _this2.props.updateFieldsErrors,
          orderitem: _this2.props.orderitem,
          changeCardNumber: _this2.props.changeCardNumber
        });
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
      var _this3 = this;

      var _props = this.props,
          keycardTypes = _props.keycardTypes,
          itemFieldsDefinition = _props.itemFieldsDefinition,
          popover = _props.popover;
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
          _react2.default.createElement(_PopoverQuestion2.default, { popover: popover }),
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
                    _this3.handleClickCheckYes();
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'inputCheckYes' + this.props.orderitem.get('id'), className: 'keycardChoice' },
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.reponse.yes', defaultMessage: 'yes' })
                ),
                _react2.default.createElement('input', { type: 'radio', id: 'inputCheckNo' + this.props.orderitem.get('id'), name: 'card', value: 'non', checked: checkSupportNo, onChange: function onChange() {
                    _this3.handleClickCheckNo();
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'inputCheckNo' + this.props.orderitem.get('id'), className: 'keycardChoice' },
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'rp.checkout.keycard.area.reponse.no', defaultMessage: 'no' })
                )
              ) : '',
              this.renderedContentCheckNo(),
              this.state.checkYes ? _react2.default.createElement(
                'div',
                { className: 'msgCheckYes' },
                this.renderedListKeyCard(keycardTypes),
                this.renderedLabelLinkPopover()
              ) : ''
            )
          )
        )
      );
    }
  }]);

  return KeyCard;
}(_react2.default.Component);

KeyCard.propTypes = {
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
  hasSupport: _propTypes.PropTypes.bool.isRequired, // boolean to know if support exists
  intl: _reactIntl.intlShape.isRequired // for the internationalization
};

exports.default = (0, _reactIntl.injectIntl)(KeyCard);
//# sourceMappingURL=KeyCard.js.map