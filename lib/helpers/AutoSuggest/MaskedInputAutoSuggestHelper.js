"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeRegexCharacters = escapeRegexCharacters;
exports.getSuggestions = getSuggestions;
exports.getSuggestionValue = getSuggestionValue;
exports.renderSuggestion = renderSuggestion;
exports.renderInputComponent = renderInputComponent;

var _react = _interopRequireDefault(require("react"));

var _reactTextMask = _interopRequireDefault(require("react-text-mask"));

var tabKeycardType = _interopRequireWildcard(require("../../constants/keycardsType"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param str
 * @returns {string|*}
 */
function escapeRegexCharacters(str) {
  return str.replace(/_-_|_| /g, '').trim();
}
/**
 * Get Suggestions of keycards
 * @param value
 * @param keycards
 * @param params
 * @param isShortnumberMode
 * @returns {*}
 */


function getSuggestions(value, keycards, params) {
  var isShortnumberMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // Filter according to mode
  keycards = keycards.filter(function (keycard) {
    return isShortnumberMode ? typeof keycard.shortnumber !== 'undefined' && keycard.shortnumber !== null : keycard.cardnumber !== null;
  });
  var escapedValue = escapeRegexCharacters(value.trim());
  var minLength = params.get('minKeycardLengthAutoComplete', 0); // if no min length and search text is empty => display all

  if (minLength === 0 && escapedValue === '') {
    return keycards;
  } // While length search text is inferior as min length configured, no return results


  if (escapedValue.length < minLength) {
    return [];
  }

  var regex = new RegExp(escapedValue, 'i'); // Filter the keycards in shortnumbers or cardnumbers

  return keycards.filter(function (keycard) {
    return regex.test(isShortnumberMode ? keycard.shortnumber : keycard.cardnumber);
  });
}
/**
 *
 * @param keycard
 * @returns {*}
 */


function getSuggestionValue(keycard) {
  return keycard.cardnumber;
}
/**
 * Render a suggestion display with highlight search string
 * @param text
 * @param query
 * @returns {*}
 */


function getHightlightNameDisplay(text, query) {
  var escapeQuery = escapeRegexCharacters(query.trim());
  var regex = new RegExp(escapeQuery, 'i');
  var rgObj = regex.exec(text);

  if (rgObj === null) {
    return text;
  }

  var findPosition = rgObj.index;
  var start = findPosition > 0 ? text.substr(0, findPosition) : '';
  var highlight = text.substr(findPosition, escapeQuery.length);
  var end = text.substr(findPosition + escapeQuery.length);
  return _react["default"].createElement("span", null, _react["default"].createElement("span", {
    key: "start"
  }, start), _react["default"].createElement("span", {
    key: "hightlight",
    className: "react-autosuggest__suggestion-match"
  }, highlight), _react["default"].createElement("span", {
    key: "end"
  }, end));
}
/**
 * Render a suggestion display
 * @param skier
 * @param query
 * @returns {XML}
 */


function renderSuggestion(keycard, _ref) {
  var query = _ref.query;
  var cardType = 'open';
  var keycardNumber = keycard.mode === tabKeycardType[cardType] ? keycard.shortnumber : keycard.cardnumber;
  return _react["default"].createElement("span", {
    key: "keycard_suggestion",
    className: "keycard_wrapper"
  }, _react["default"].createElement("span", {
    className: "keycard_suggestion"
  }, getHightlightNameDisplay(keycardNumber, query)), _react["default"].createElement("span", {
    className: "contact_suggestion"
  }, keycard.contacts.map(function (contact) {
    return _react["default"].createElement("span", {
      key: contact.id
    }, " - ", contact.lastname, " ", contact.firstname);
  })));
}
/**
 * @param inputProps
 * @returns {XML}
 */


function renderInputComponent(inputProps) {
  return _react["default"].createElement("div", {
    className: "inputContainer"
  }, _react["default"].createElement(_reactTextMask["default"], inputProps));
}
//# sourceMappingURL=MaskedInputAutoSuggestHelper.js.map