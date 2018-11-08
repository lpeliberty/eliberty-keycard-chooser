import { Map } from 'immutable';

/**
 * Function to check the validation of all fields necessary for check swisspass
 * @returns {boolean}
 * @param localItemInfo
 */
export function canCheckSwissPass(localItemInfo) {
  const swissPassElem = localItemInfo
    .get('keycardsMask', new Map())
    .get('swisspassElem', new Map());
  console.log(swissPassElem.toJS());
  return (swissPassElem.get('validNumber', false)
    && swissPassElem.get('validZipcode', false)
    && swissPassElem.get('checked', false)) === true;
}

export function getSwissPassProperty(localItemInfo, property) {
  return localItemInfo
    .get('keycardsMask', new Map())
    .get('swisspassElem', new Map())
    .get(property, '');
}
