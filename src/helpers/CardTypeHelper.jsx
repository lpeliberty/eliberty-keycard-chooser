import { Map, List } from 'immutable';
import * as KeycardsType from '../constants/keycardsType';

/**
 * Return the cardNumber field (properties)
 *
 * @param localItemInfo
 */
export function getCardNumberField(localItemInfo) {
  return localItemInfo.get('cardNumber', new Map());
}

/**
 * Function to check the validation of all fields necessary for check swisspass
 * @returns {boolean}
 * @param localItemInfo
 */
export function canCheckSwissPass(localItemInfo) {
  const swissPassElem = getCardNumberTypeElement(localItemInfo, 'swisspass');
  return (swissPassElem.get('formatValid', false)
    && swissPassElem.get('zipcodeFormatValid', false)
    && swissPassElem.get('checked', false)) === true;
}

export function getSwissPassProperty(localItemInfo, property) {
  return localItemInfo
    .get('keycardsMask', new Map())
    .get('swisspassElem', new Map())
    .get(property, '');
}

/**
 * Check if current cardNumber type is corresponding to asked type
 *
 * @param localItemInfo
 * @param type
 * @returns {boolean}
 */
export function isCurrentCardNumberType(localItemInfo, type) {
  return getCurrentCardNumberType(localItemInfo) === type;
}

/**
 * Get current cardNumber type
 *
 * @param localItemInfo
 */
export function getCurrentCardNumberType(localItemInfo) {
  return getCardNumberField(localItemInfo).get('currentType', '');
}

/**
 * Get the current cardType element
 *
 * @param localItemInfo
 */
export function getCurrentCardTypeElement(localItemInfo) {
  return getCardNumberTypeElement(localItemInfo, getCurrentCardNumberType(localItemInfo));
}

/**
 * Get cardNumber value by current type
 *
 * @param localItemInfo
 * @param property
 */
export function getCurrentCardNumberValue(localItemInfo, property = 'number') {
  const currentCardTypeElement = getCurrentCardTypeElement(localItemInfo);
  return currentCardTypeElement.get(property, '');
}

/**
 * Return if current cardNumber valid status
 *
 * @param localItemInfo
 */
export function isCurrentCardNumberValid(localItemInfo) {
  return getCurrentCardNumberType(localItemInfo).get('valid', false);
}

/**
 * Return the cardNumber types available
 *
 * @param localItemInfo
 */
export function getCardNumberTypes(localItemInfo) {
  return getCardNumberField(localItemInfo).get('types', new List());
}

/**
 * Get cardType element
 *
 * @param localItemInfo
 * @param type
 */
export function getCardNumberTypeElement(localItemInfo, type) {
  return getCardNumberField(localItemInfo)
    .get('types', new List())
    .get(type, new Map());
}

/**
 * Get cardNumber element property value
 *
 * @param localItemInfo
 * @param type
 * @param property
 */
export function getCardNumberTypeElementProperty(localItemInfo, type, property) {
  return getCardNumberTypeElement(localItemInfo, type).get(property);
}
