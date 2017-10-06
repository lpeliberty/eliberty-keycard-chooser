import React from 'react';
import MaskedInput from 'react-text-mask';

export function escapeRegexCharacters(str) {
  return str.replace(/_-_|_| /g, '').trim();
}

export function getSuggestions(value, keycards, params) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue.length < params.get('minKeycardLengthAutoComplete', 0)) {
    return [];
  }

  if (escapedValue === '') {
    return keycards;
  }

  const regex = new RegExp(escapedValue, 'i');

  return keycards.filter(keycard => regex.test(keycard.cardnumber));
}

export function getSuggestionValue(keycard) {
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
  const escapeQuery = escapeRegexCharacters(query.trim());
  const regex = new RegExp(escapeQuery, 'i');
  const rgObj = regex.exec(text);

  if (rgObj === null) {
    return text;
  }
  const findPosition = rgObj.index;

  const start = findPosition > 0 ? text.substr(0, findPosition) : '';
  const highlight = text.substr(findPosition, escapeQuery.length);
  const end = text.substr(findPosition + escapeQuery.length);

  return (
    <span>
      <span key="start">{start}</span>
      <span key="hightlight" className="react-autosuggest__suggestion-match">{highlight}</span>
      <span key="end">{end}</span>
    </span>
  );
}

/**
 * Render a suggestion display
 *
 * @param skier
 * @param query
 * @returns {XML}
 */
export function renderSuggestion(keycard, { query }) {
  return (
    <span key="keycard_suggestion" className="keycard_wrapper">
      <span className="keycard_suggestion">
        {getHightlightNameDisplay(keycard.cardnumber, query)}
      </span>
      <span className="contact_suggestion">
        {
          keycard.contacts.map(
            contact => <span key={contact.id}> - {contact.lastname} {contact.firstname}</span>
          )
        }
      </span>
    </span>
  );
}

export function renderInputComponent(inputProps) {
  return (
    <div className="inputContainer">
      <MaskedInput {...inputProps} />
    </div>
  );
}
