'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canCheckSwissPass = canCheckSwissPass;
exports.getSwissPassProperty = getSwissPassProperty;

var _immutable = require('immutable');

/**
 * Function to check the validation of all fields necessary for check swisspass
 * @returns {boolean}
 * @param localItemInfo
 */
function canCheckSwissPass(localItemInfo) {
  var swissPassElem = localItemInfo.get('keycardsMask', new _immutable.Map()).get('swisspassElem', new _immutable.Map());
  return (swissPassElem.get('validNumber', false) && swissPassElem.get('validZipcode', false) && swissPassElem.get('checked', false)) === true;
}

function getSwissPassProperty(localItemInfo, property) {
  return localItemInfo.get('keycardsMask', new _immutable.Map()).get('swisspassElem', new _immutable.Map()).get(property, '');
}
//# sourceMappingURL=CardTypeHelper.js.map