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

var _moment = require('moment/src/moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, skiers, params) {
  var escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue.length < params.get('minContactLengthAutoComplete', 0)) {
    return [];
  }

  if (escapedValue === '') {
    return skiers;
  }

  var regex = new RegExp(escapedValue, 'i');

  return skiers.filter(function (skier) {
    return regex.test(skier.lastname) || regex.test(skier.firstname);
  });
}

function getSuggestionValue(skier) {
  return skier.firstname;
}

/**
 * Render a suggestion display with highlight search string
 *
 * @param text
 * @param query
 * @returns {*}
 */
function getHightlightNameDisplay(text, query) {
  var regex = new RegExp(query, 'i');
  var rgObj = regex.exec(text);

  if (rgObj === null) {
    return text;
  }
  var findPosition = rgObj.index;

  var start = findPosition > 0 ? text.substr(0, findPosition) : '';
  var highlight = text.substr(findPosition, query.length);
  var end = text.substr(findPosition + query.length);

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
function renderSuggestion(skier, _ref) {
  var query = _ref.query;

  return _react2.default.createElement(
    'span',
    { className: 'skier_wrapper' },
    _react2.default.createElement(
      'span',
      { className: 'suggestion_skier' },
      getHightlightNameDisplay(skier.firstname, query),
      '\xA0',
      getHightlightNameDisplay(skier.lastname, query),
      '\xA0',
      _react2.default.createElement(
        'span',
        { className: 'suggestion_birthdate' },
        'n\xE9(e) le ',
        (0, _moment2.default)(skier.birthdate).format('DD/MM/YYYY')
      )
    ),
    skier.keycard !== undefined && skier.keycard !== '' ? _react2.default.createElement(
      'span',
      { className: 'suggestion_keycard' },
      '\u2192 Derni\xE8re carte utilis\xE9e ',
      skier.keycard
    ) : ''
  );
}

function renderInputComponent(inputProps) {
  return _react2.default.createElement(
    'div',
    { className: 'inputContainer' },
    _react2.default.createElement('input', inputProps),
    _react2.default.createElement(
      'label',
      { htmlFor: 'firstName', className: 'dropDown' },
      'Pr\xE9nom'
    )
  );
}
//# sourceMappingURL=InputAutoSuggestHelper.js.map