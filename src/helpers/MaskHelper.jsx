import * as tabKeycardType from '../constants/keycardsType';

/**
 * Function to check the validation of the card number entered according to the type of card
 * @param cardNumber
 * @param index
 * @param card
 * @returns {boolean}
 */
export function verifyKeycard(cardNumber, index, card) {
  const patternSD = /^[0-9]{1,2}-[0-9]{20}-[0-9]$/;
  const patternTA = /^([a-zA-Z0-9]{8})[ -]([a-zA-Z0-9]{3})[ -]([a-zA-Z0-9]{3})$/;
  const patternALFI = /^([0-9]{5})[ -]([0-9]{5})[ -]([0-9]{4})$/;
  const patternOPEN = /^([0-9]{9})[ -]([0-9]{1})$/;
  const patternSWISSPASS = /^([a-zA-Z]{1})([0-9]{2})[ -]([0-9]{3})[ -]([0-9]{3})[ -]([0-9]{3})$/;

  // verification the card type
  switch (card) {
    case tabKeycardType.sd: {
      if (cardNumber.length < 25 || !patternSD.test(cardNumber)
        || ['01', '1', '30', '25'].indexOf(cardNumber.split('-')[0]) === -1) {
        return false;
      }
      break;
    }
    case tabKeycardType.ta: {
      if (cardNumber.length < 16 || !patternTA.test(cardNumber)) {
        return false;
      }
      break;
    }
    case tabKeycardType.alfi: {
      if (cardNumber.length < 16 || !patternALFI.test(cardNumber)) {
        return false;
      }
      break;
    }
    case tabKeycardType.open: {
      if (cardNumber.length < 11 || !patternOPEN.test(cardNumber)) {
        return false;
      }
      break;
    }
    case tabKeycardType.swisspass: {
      if (cardNumber.length < 11 || !patternSWISSPASS.test(cardNumber)) {
        return false;
      }
      break;
    }
    default: { break; }
  }
  return true;
}
