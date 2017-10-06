'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _KeycardChooser = require('./components/KeycardChooser');

var _KeycardChooser2 = _interopRequireDefault(_KeycardChooser);

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');

require('../node_modules/bootstrap-sass/assets/javascripts/bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_KeycardChooser2.default, { name: 'React Lib keycard-chooser' }), document.getElementById('root'));
//# sourceMappingURL=index.js.map