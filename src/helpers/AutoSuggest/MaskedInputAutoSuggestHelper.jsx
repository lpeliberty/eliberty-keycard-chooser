import React from 'react';
import MaskedInput from 'react-text-mask';
import * as tabKeycardType from '../../constants/keycardsType';

/**
 * @param str
 * @returns {string|*}
 */
export function escapeRegexCharacters(str) {
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
export function getSuggestions(value, keycards, params, isShortnumberMode = false) {
  console.log('keycards', keycards, isShortnumberMode);
  // Filter according to mode
  keycards = keycards.filter((keycard) => {
    console.log('keycard', keycard, keycard.shortnumber);
    return isShortnumberMode ? keycard.shortnumber !== 'undefined' && keycard.shortnumber !== null : keycard.cardnumber !== null
  });
  console.log('filtered keycards', keycards);

  const escapedValue = escapeRegexCharacters(value.trim());
  const minLength = params.get('minKeycardLengthAutoComplete', 0);

  // if no min length and search text is empty => display all
  if (minLength === 0 && escapedValue === '') {
    return keycards;
  }

  // While length search text is inferior as min length configured, no return results
  if (escapedValue.length < minLength) {
    return [];
  }

  const regex = new RegExp(escapedValue, 'i');

  // Filter the keycards in shortnumbers or cardnumbers
  const filtered = keycards.filter(
    keycard => regex.test(isShortnumberMode ? keycard.shortnumber : keycard.cardnumber),
  );

  return filtered;
}

/**
 *
 * @param keycard
 * @returns {*}
 */
export function getSuggestionValue(keycard) {
  return keycard.cardnumber;
}

/**
 * Render a suggestion display with highlight search string
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
 * @param skier
 * @param query
 * @returns {XML}
 */
export function renderSuggestion(keycard, { query }) {
  const cardType = 'open';
  const keycardNumber = keycard.mode === tabKeycardType[cardType]
    ? keycard.shortnumber
    : keycard.cardnumber;
  return (
    <span key="keycard_suggestion" className="keycard_wrapper">
      <span className="keycard_suggestion">
        {getHightlightNameDisplay(keycardNumber, query)}
      </span>
      <span className="contact_suggestion">
        {
          keycard.contacts.map(
            contact => <span key={contact.id}> - {contact.lastname} {contact.firstname}</span>,
          )
        }
      </span>
    </span>
  );
}

/**
 * @param inputProps
 * @returns {XML}
 */
export function renderInputComponent(inputProps) {
  return (
    <div className="inputContainer">
      <MaskedInput {...inputProps} />
    </div>
  );
}
