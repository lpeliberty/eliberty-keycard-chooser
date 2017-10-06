/**
 * Get insurance option (normally only one)
 * @param orderitem
 * @returns {*|V}
 */
export function getInsurance(orderitem) {
  const children = orderitem.get('orderitemchildren');
  return children.filter(child => child.get('type') === 'insurance').first();
}

/**
 * Get options (not include insurance)
 * @param orderitem
 */
export function getOptions(orderitem) {
  return orderitem.get('orderitemchildren')
    .filter(child => !['insurance', 'support'].includes(child.get('type')));
}

/**
 * Get insurance name
 * @param insuranceOrderitem
 * @returns {string}
 */
export function getInsuranceName(insuranceOrderitem) {
  if (typeof insuranceOrderitem !== 'undefined') {
    return insuranceOrderitem.get('product').get('name');
  }
  return '';
}
