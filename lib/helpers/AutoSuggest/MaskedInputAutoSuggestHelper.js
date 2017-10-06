'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeRegexCharacters = escapeRegexCharacters;
exports.getSuggestions = getSuggestions;
exports.getSuggestionValue = getSuggestionValue;
exports.renderSuggestion = renderSuggestion;
exports.renderInputComponent = renderInputComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeRegexCharacters(str) {
  return str.replace(/_-_|_| /g, '').trim();
}

function getSuggestions(value, keycards, params) {
  var escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue.length < params.get('minKeycardLengthAutoComplete', 0)) {
    return [];
  }

  if (escapedValue === '') {
    return keycards;
  }

  var regex = new RegExp(escapedValue, 'i');

  return keycards.filter(function (keycard) {
    return regex.test(keycard.cardnumber);
  });
}

function getSuggestionValue(keycard) {
  return keycard.cardnumber;
}

/**
 * Render a suggestion display with highlight search string
 *
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

  return _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement(
      'span',
      { key: 'start' },
      start
    ),
    _react2.default.createElement(
      'span',
      { key: 'hightlight', className: 'react-autosuggest__suggestion-match' },
      highlight
    ),
    _react2.default.createElement(
      'span',
      { key: 'end' },
      end
    )
  );
}

/**
 * Render a suggestion display
 *
 * @param skier
 * @param query
 * @returns {XML}
 */
function renderSuggestion(keycard, _ref) {
  var query = _ref.query;

  return _react2.default.createElement(
    'span',
    { key: 'keycard_suggestion', className: 'keycard_wrapper' },
    _react2.default.createElement(
      'span',
      { className: 'keycard_suggestion' },
      getHightlightNameDisplay(keycard.cardnumber, query)
    ),
    _react2.default.createElement(
      'span',
      { className: 'contact_suggestion' },
      keycard.contacts.map(function (contact) {
        return _react2.default.createElement(
          'span',
          { key: contact.id },
          ' - ',
          contact.lastname,
          ' ',
          contact.firstname
        );
      })
    )
  );
}

function renderInputComponent(inputProps) {
  return _react2.default.createElement(
    'div',
    { className: 'inputContainer' },
    _react2.default.createElement(_reactTextMask2.default, inputProps)
  );
}
//# sourceMappingURL=MaskedInputAutoSuggestHelper.js.map