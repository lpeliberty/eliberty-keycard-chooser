'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInsurance = getInsurance;
exports.getOptions = getOptions;
exports.getInsuranceName = getInsuranceName;
/**
 * Get insurance option (normally only one)
 * @param orderitem
 * @returns {*|V}
 */
function getInsurance(orderitem) {
  var children = orderitem.get('orderitemchildren');
  return children.filter(function (child) {
    return child.get('type') === 'insurance';
  }).first();
}

/**
 * Get options (not include insurance)
 * @param orderitem
 */
function getOptions(orderitem) {
  return orderitem.get('orderitemchildren').filter(function (child) {
    return !['insurance', 'support'].includes(child.get('type'));
  });
}

/**
 * Get insurance name
 * @param insuranceOrderitem
 * @returns {string}
 */
function getInsuranceName(insuranceOrderitem) {
  if (typeof insuranceOrderitem !== 'undefined') {
    return insuranceOrderitem.get('product').get('name');
  }
  return '';
}
//# sourceMappingURL=OrderItemHelper.js.map