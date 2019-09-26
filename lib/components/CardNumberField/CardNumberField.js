"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTextMask = _interopRequireDefault(require("react-text-mask"));

var _reactAutosuggest = _interopRequireDefault(require("react-autosuggest"));

var AutoSuggestionHelper = _interopRequireWildcard(require("../../helpers/AutoSuggest/MaskedInputAutoSuggestHelper"));

var tabKeycardType = _interopRequireWildcard(require("../../constants/keycardsType"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var configs = {
  SKIDATA: {
    placeholder: '00-0000 0000 0000 0000 0000-0',
    mask: [/[0-3]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/],
    pipe: function pipe(value) {
      return value[0] === '1' ? {
        value: "01".concat(value.slice(2)),
        indexesOfPipedChars: [0]
      } : value;
    }
  },
  TEAMAXESS: {
    placeholder: 'XXXXXXXX-XXX-XXX',
    mask: [/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[Aa-zA-Z0-9]/, '-', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, '-', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/]
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
    placeholder: 'S00-000-000-000',
    mask: [/[S|s]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]
  },
  VERBIER: {
    placeholder: 'A000000',
    mask: [/[A|B]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  }
};
/**
 * Card Number Field
 */

var CardNumberField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardNumberField, _React$Component);

  function CardNumberField(props) {
    var _this;

    _classCallCheck(this, CardNumberField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardNumberField).call(this, props));
    _this.onSuggestionsFetchRequested = _this.onSuggestionsFetchRequested.bind(_assertThisInitialized(_this));
    _this.onSuggestionsClearRequested = _this.onSuggestionsClearRequested.bind(_assertThisInitialized(_this));
    _this.onSuggestionSelected = _this.onSuggestionSelected.bind(_assertThisInitialized(_this));
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
    key: "onSuggestionsFetchRequested",
    value: function onSuggestionsFetchRequested(_ref) {
      var _this2 = this;

      var value = _ref.value;
      var cardType = 'open';
      var listKeycards = AutoSuggestionHelper.getSuggestions(value, this.props.keycards.toJS(), this.props.params, this.props.mode === tabKeycardType[cardType] // Define if we are on shortnumber using mode
      ); // Add element type card for display suggestions

      listKeycards.forEach(function (keycard) {
        keycard.mode = _this2.props.mode;
      });
      this.setState({
        suggestions: listKeycards
      });
    }
  }, {
    key: "onSuggestionsClearRequested",
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
    key: "onSuggestionSelected",
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
    key: "renderedCardNumberField",
    value: function renderedCardNumberField(mode, params, suggestions, inputProps) {
      return mode !== 'OPEN' && params.get('displayKeycardAutoComplete', false) === true ? _react["default"].createElement(_reactAutosuggest["default"], {
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
      }) : _react["default"].createElement(_reactTextMask["default"], inputProps);
    }
  }, {
    key: "render",
    value: function render() {
      var suggestions = this.state.suggestions;
      var _this$props = this.props,
          mode = _this$props.mode,
          handleChangeCardNumber = _this$props.handleChangeCardNumber,
          cardNumber = _this$props.cardNumber,
          params = _this$props.params,
          validInput = _this$props.validInput;

      var inputProps = _objectSpread({}, configs[mode], {
        id: cardNumber,
        className: validInput === true ? 'form-control text-left' : 'form-control text-left inputError',
        onChange: handleChangeCardNumber,
        value: cardNumber
      });

      return _react["default"].createElement("div", null, this.renderedCardNumberField(mode, params, suggestions, inputProps));
    }
  }]);

  return CardNumberField;
}(_react["default"].Component);

CardNumberField.propTypes = {
  mode: _propTypes["default"].string.isRequired,
  handleChangeCardNumber: _propTypes["default"].func.isRequired,
  onAutoSuggestSelected: _propTypes["default"].func.isRequired,
  cardNumber: _propTypes["default"].string.isRequired,
  keycards: _propTypes["default"].object.isRequired,
  params: _propTypes["default"].object.isRequired,
  validInput: _propTypes["default"].bool.isRequired
};
var _default = CardNumberField;
exports["default"] = _default;
//# sourceMappingURL=CardNumberField.js.map