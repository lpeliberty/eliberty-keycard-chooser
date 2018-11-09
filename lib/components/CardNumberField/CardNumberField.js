'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _MaskedInputAutoSuggestHelper = require('../../helpers/AutoSuggest/MaskedInputAutoSuggestHelper');

var AutoSuggestionHelper = _interopRequireWildcard(_MaskedInputAutoSuggestHelper);

var _keycardsType = require('../../constants/keycardsType');

var tabKeycardType = _interopRequireWildcard(_keycardsType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configs = {
  SKIDATA: {
    placeholder: '00-0000 0000 0000 0000 0000-0',
    mask: [/[0-3]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/],
    pipe: function pipe(value) {
      return value[0] === '1' ? { value: '01' + value.slice(2), indexesOfPipedChars: [0] } : value;
    }
  },
  TEAMAXESS: {
    placeholder: 'XXXXXXXX-XXX-XXX',
    mask: [/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[Aa-zA-Z0-9]/, '-', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, '-', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/],
    pipe: function pipe(value) {
      return value[0] === '1' ? { value: '01' + value.slice(2), indexesOfPipedChars: [0] } : value;
    }
  },
  ALFI: {
    placeholder: '_____-_____-____',
    mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  },
  'GO-SKI': {
    placeholder: '000000000-0',
    mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/]
  },
  SWISSPASS: {
    placeholder: 'X00-000-000-000',
    mask: [/[S]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]
  }
};

/**
 * Card Number Field
 */

var CardNumberField = function (_React$Component) {
  _inherits(CardNumberField, _React$Component);

  function CardNumberField(props) {
    _classCallCheck(this, CardNumberField);

    var _this = _possibleConstructorReturn(this, (CardNumberField.__proto__ || Object.getPrototypeOf(CardNumberField)).call(this, props));

    _this.onSuggestionsFetchRequested = _this.onSuggestionsFetchRequested.bind(_this);
    _this.onSuggestionsClearRequested = _this.onSuggestionsClearRequested.bind(_this);
    _this.onSuggestionSelected = _this.onSuggestionSelected.bind(_this);

    _this.state = {
      suggestions: []
    };
    return _this;
  }

  /**
   *
   * @param value
   */


  _createClass(CardNumberField, [{
    key: 'onSuggestionsFetchRequested',
    value: function onSuggestionsFetchRequested(_ref) {
      var _this2 = this;

      var value = _ref.value;

      var cardType = 'open';
      var listKeycards = AutoSuggestionHelper.getSuggestions(value, this.props.keycards.toJS(), this.props.params, this.props.mode === tabKeycardType[cardType] // Define if we are on shortnumber using mode
      );
      // Add element type card for display suggestions
      listKeycards.forEach(function (keycard) {
        keycard.mode = _this2.props.mode;
      });

      this.setState({
        suggestions: listKeycards
      });
    }
  }, {
    key: 'onSuggestionsClearRequested',
    value: function onSuggestionsClearRequested() {
      this.setState({
        suggestions: []
      });
    }

    /**
     *
     * @param event
     * @param suggestion
     */

  }, {
    key: 'onSuggestionSelected',
    value: function onSuggestionSelected(event, _ref2) {
      var suggestion = _ref2.suggestion;

      var cardType = 'open';
      var cardnumber = suggestion.mode === tabKeycardType[cardType] ? suggestion.shortnumber : suggestion.cardnumber;
      this.props.onAutoSuggestSelected(cardnumber);
    }

    /**
     *
     * @param mode
     * @param params
     * @param suggestions
     * @param inputProps
     * @returns {XML}
     */

  }, {
    key: 'renderedCardNumberField',
    value: function renderedCardNumberField(mode, params, suggestions, inputProps) {
      return mode !== 'OPEN' && params.get('displayKeycardAutoComplete', false) === true ? _react2.default.createElement(_reactAutosuggest2.default, {
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        onSuggestionSelected: this.onSuggestionSelected,
        shouldRenderSuggestions: function shouldRenderSuggestions() {
          return true;
        },
        getSuggestionValue: AutoSuggestionHelper.getSuggestionValue,
        renderSuggestion: AutoSuggestionHelper.renderSuggestion,
        inputProps: inputProps,
        renderInputComponent: AutoSuggestionHelper.renderInputComponent,
        focusInputOnSuggestionClick: false
      }) : _react2.default.createElement(_reactTextMask2.default, inputProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var suggestions = this.state.suggestions;
      var _props = this.props,
          mode = _props.mode,
          handleChangeCardNumber = _props.handleChangeCardNumber,
          cardNumber = _props.cardNumber,
          params = _props.params,
          validInput = _props.validInput;

      var inputProps = _extends({}, configs[mode], {
        id: cardNumber,
        className: validInput === true ? 'form-control text-left' : 'form-control text-left inputError',
        onChange: handleChangeCardNumber,
        value: cardNumber
      });

      return _react2.default.createElement(
        'div',
        null,
        this.renderedCardNumberField(mode, params, suggestions, inputProps)
      );
    }
  }]);

  return CardNumberField;
}(_react2.default.Component);

CardNumberField.propTypes = {
  mode: _propTypes2.default.string.isRequired,
  handleChangeCardNumber: _propTypes2.default.func.isRequired,
  onAutoSuggestSelected: _propTypes2.default.func.isRequired,
  cardNumber: _propTypes2.default.string.isRequired,
  keycards: _propTypes2.default.object.isRequired,
  params: _propTypes2.default.object.isRequired,
  validInput: _propTypes2.default.bool.isRequired
};

exports.default = CardNumberField;
//# sourceMappingURL=CardNumberField.js.map