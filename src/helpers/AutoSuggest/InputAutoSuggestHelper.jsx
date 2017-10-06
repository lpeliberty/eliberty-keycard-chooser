import React from 'react';
import moment from 'moment/src/moment';

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(value, skiers, params) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue.length < params.get('minContactLengthAutoComplete', 0)) {
    return [];
  }

  if (escapedValue === '') {
    return skiers;
  }

  const regex = new RegExp(escapedValue, 'i');

  return skiers.filter(skier => regex.test(skier.lastname) || regex.test(skier.firstname));
}

export function getSuggestionValue(skier) {
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
  const regex = new RegExp(query, 'i');
  const rgObj = regex.exec(text);

  if (rgObj === null) {
    return text;
  }
  const findPosition = rgObj.index;

  const start = findPosition > 0 ? text.substr(0, findPosition) : '';
  const highlight = text.substr(findPosition, query.length);
  const end = text.substr(findPosition + query.length);

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
export function renderSuggestion(skier, { query }) {
  return (
    <span className="skier_wrapper">
      <span className="suggestion_skier">
        {getHightlightNameDisplay(skier.firstname, query)}
        &nbsp;
        {getHightlightNameDisplay(skier.lastname, query)}
        &nbsp;<span className="suggestion_birthdate">né(e) le {moment(skier.birthdate).format('DD/MM/YYYY')}</span>
      </span>
      {
        skier.keycard !== undefined && skier.keycard !== ''
          ? <span className="suggestion_keycard">→ Dernière carte utilisée {skier.keycard}</span>
          : ''
      }
    </span>
  );
}

export function renderInputComponent(inputProps) {
  return (
    <div className="inputContainer">
      <input {...inputProps} />
      <label htmlFor="firstName" className="dropDown">Prénom</label>
    </div>
  );
}
