'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardNumberFormatIsValid = cardNumberFormatIsValid;

var _CardTypeHelper = require('./CardTypeHelper');

/**
 * Return if the current cardNumber are a valid format
 *
 * @param localItemInfo
 */
function cardNumberFormatIsValid(localItemInfo) {
  var currentCardNumberType = (0, _CardTypeHelper.getCurrentCardNumberType)(localItemInfo);
  console.log('currentCardNumberType', currentCardNumberType);
  console.log('localItemInfo', localItemInfo.toJS());
  switch (currentCardNumberType) {
    case 'sd':
    case 'ta':
    case 'open':
      return (0, _CardTypeHelper.getCardNumberTypeElementProperty)(localItemInfo, currentCardNumberType, 'formatValid');
    case 'swisspass':
      return (0, _CardTypeHelper.isSwissPassPropertyValid)(localItemInfo, 'formatValid') && (0, _CardTypeHelper.isSwissPassPropertyValid)(localItemInfo, 'zipcodeFormatValid') && (0, _CardTypeHelper.isSwissPassPropertyValid)(localItemInfo, 'checked');
    default:
      return false;
  }
}
//# sourceMappingURL=CardNumberHelper.js.map