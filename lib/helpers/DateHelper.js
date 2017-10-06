'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEndDate = function getEndDate(startDate, validityCategory) {
  var end = (0, _moment2.default)(startDate);

  var duration = 0;
  if (validityCategory !== null) {
    duration = validityCategory.get('value') - 1;
  }

  return end.add(duration, 'day');
};

exports.default = getEndDate;
//# sourceMappingURL=DateHelper.js.map