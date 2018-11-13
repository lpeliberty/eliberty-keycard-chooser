'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyKeycard = verifyKeycard;

var _keycardsType = require('../constants/keycardsType');

var tabKeycardType = _interopRequireWildcard(_keycardsType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Function to check the validation of the card number entered according to the type of card
 * @param cardNumber
 * @param card
 * @returns {boolean}
 */
function verifyKeycard(cardNumber, card) {
  var patternSD = /^[0-9]{1,2}-[0-9]{20}-[0-9]$/;
  var patternTA = /^([a-zA-Z0-9]{8})[ -]([a-zA-Z0-9]{3})[ -]([a-zA-Z0-9]{3})$/;
  var patternALFI = /^([0-9]{5})[ -]([0-9]{5})[ -]([0-9]{4})$/;
  var patternOPEN = /^([0-9]{9})[ -]([0-9]{1})$/;
  var patternSWISSPASS = /^([S-s]{1})([0-9]{2})[ -]([0-9]{3})[ -]([0-9]{3})[ -]([0-9]{3})$/;

  // verification the card type
  switch (card) {
    case tabKeycardType.sd:
      {
        if (cardNumber.length < 25 || !patternSD.test(cardNumber) || ['01', '1', '30', '25'].indexOf(cardNumber.split('-')[0]) === -1) {
          return false;
        }
        break;
      }
    case tabKeycardType.ta:
      {
        if (cardNumber.length < 16 || !patternTA.test(cardNumber)) {
          return false;
        }
        break;
      }
    case tabKeycardType.alfi:
      {
        if (cardNumber.length < 16 || !patternALFI.test(cardNumber)) {
          return false;
        }
        break;
      }
    case tabKeycardType.open:
      {
        if (cardNumber.length < 11 || !patternOPEN.test(cardNumber)) {
          return false;
        }
        break;
      }
    case tabKeycardType.swisspass:
      {
        if (cardNumber.length < 15 || !patternSWISSPASS.test(cardNumber)) {
          return false;
        }
        break;
      }
    default:
      {
        break;
      }
  }
  return true;
}
//# sourceMappingURL=MaskHelper.js.map