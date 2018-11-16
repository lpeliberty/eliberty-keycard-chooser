import {
  getCurrentCardNumberType,
  getCardNumberTypeElementProperty,
  isSwissPassPropertyValid,
} from './CardTypeHelper';

/**
 * Return if the current cardNumber are a valid format
 *
 * @param localItemInfo
 */
export function cardNumberFormatIsValid(localItemInfo) {
  const currentCardNumberType = getCurrentCardNumberType(localItemInfo);
  switch (currentCardNumberType) {
    case 'sd':
    case 'ta':
    case 'open':
      return getCardNumberTypeElementProperty(localItemInfo, currentCardNumberType, 'formatValid');
    case 'swisspass':
      return isSwissPassPropertyValid(localItemInfo, 'formatValid')
        && isSwissPassPropertyValid(localItemInfo, 'zipcodeFormatValid')
        && isSwissPassPropertyValid(localItemInfo, 'checked');
    default:
      return false;
  }
}
