'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardNumberField = getCardNumberField;
exports.canCheckSwissPass = canCheckSwissPass;
exports.getSwissPassProperty = getSwissPassProperty;
exports.isCurrentCardNumberType = isCurrentCardNumberType;
exports.getCurrentCardNumberType = getCurrentCardNumberType;
exports.getCurrentCardTypeElement = getCurrentCardTypeElement;
exports.getCurrentCardNumberValue = getCurrentCardNumberValue;
exports.isCurrentCardNumberValid = isCurrentCardNumberValid;
exports.getCardNumberTypes = getCardNumberTypes;
exports.getCardNumberTypeElement = getCardNumberTypeElement;
exports.getCardNumberTypeElementProperty = getCardNumberTypeElementProperty;

var _immutable = require('immutable');

/**
 * Return the cardNumber field (properties)
 *
 * @param localItemInfo
 */
function getCardNumberField(localItemInfo) {
  return localItemInfo.get('fields', new _immutable.Map()).get('cardNumber', new _immutable.Map());
}

/**
 * Function to check the validation of all fields necessary for check swisspass
 * @returns {boolean}
 * @param localItemInfo
 */
function canCheckSwissPass(localItemInfo) {
  var swissPassElem = getCardNumberTypeElement(localItemInfo, 'swisspass');
  return (swissPassElem.get('formatValid', false) && swissPassElem.get('zipcodeFormatValid', false) && swissPassElem.get('checked', false)) === true;
}

function getSwissPassProperty(localItemInfo, property) {
  return localItemInfo.get('keycardsMask', new _immutable.Map()).get('swisspassElem', new _immutable.Map()).get(property, '');
}

/**
 * Check if current cardNumber type is corresponding to asked type
 *
 * @param localItemInfo
 * @param type
 * @returns {boolean}
 */
function isCurrentCardNumberType(localItemInfo, type) {
  return getCurrentCardNumberType(localItemInfo) === type;
}

/**
 * Get current cardNumber type
 *
 * @param localItemInfo
 */
function getCurrentCardNumberType(localItemInfo) {
  return getCardNumberField(localItemInfo).get('currentType', '');
}

/**
 * Get the current cardType element
 *
 * @param localItemInfo
 */
function getCurrentCardTypeElement(localItemInfo) {
  return getCardNumberTypeElement(localItemInfo, getCurrentCardNumberType(localItemInfo));
}

/**
 * Get cardNumber value by current type
 *
 * @param localItemInfo
 * @param property
 */
function getCurrentCardNumberValue(localItemInfo) {
  var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'number';

  var currentCardTypeElement = getCurrentCardTypeElement(localItemInfo);
  return currentCardTypeElement.get(property, '');
}

/**
 * Return if current cardNumber valid status
 *
 * @param localItemInfo
 */
function isCurrentCardNumberValid(localItemInfo) {
  return getCurrentCardNumberType(localItemInfo).get('valid', false);
}

/**
 * Return the cardNumber types available
 *
 * @param localItemInfo
 */
function getCardNumberTypes(localItemInfo) {
  return getCardNumberField(localItemInfo).get('types', new _immutable.List());
}

/**
 * Get cardType element
 *
 * @param localItemInfo
 * @param type
 */
function getCardNumberTypeElement(localItemInfo, type) {
  return getCardNumberField(localItemInfo).get('types', new _immutable.List()).get(type, new _immutable.Map());
}

/**
 * Get cardNumber element property value
 *
 * @param localItemInfo
 * @param type
 * @param property
 */
function getCardNumberTypeElementProperty(localItemInfo, type, property) {
  return getCardNumberTypeElement(localItemInfo, type).get(property);
}
//# sourceMappingURL=CardTypeHelper.js.map