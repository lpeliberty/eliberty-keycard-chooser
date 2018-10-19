'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PopoverQuestion
 */
var PopoverQuestion = function (_React$Component) {
  _inherits(PopoverQuestion, _React$Component);

  _createClass(PopoverQuestion, null, [{
    key: 'questionImageSvg',

    /**
     * Display picture question
     * @returns {XML}
     */
    value: function questionImageSvg() {
      return _react2.default.createElement(
        'svg',
        {
          x: '0px',
          y: '0px',
          width: '15px',
          height: '15px',
          viewBox: '0 0 612 612',
          fill: '#B8B8B8'
        },
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z' }),
            _react2.default.createElement('path', { d: 'M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259C315.875,186.187,329.033,191.083,336.962,200.875z' }),
            _react2.default.createElement('path', { d: 'M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306S459.64,584.182,306,584.182S27.818,459.64,27.818,306z' }),
            _react2.default.createElement('rect', { x: '274.51', y: '415.214', width: '40.559', height: '42.367' })
          )
        )
      );
    }

    /**
     * Constructor
     * @param props
     */

  }]);

  function PopoverQuestion(props) {
    _classCallCheck(this, PopoverQuestion);

    var _this = _possibleConstructorReturn(this, (PopoverQuestion.__proto__ || Object.getPrototypeOf(PopoverQuestion)).call(this, props));

    _this.state = {
      popoverQuestionOpen: false
    };
    _this.changeStatePopoverOpen = _this.changeStatePopoverOpen.bind(_this);
    return _this;
  }

  /**
   * Change local state for open popover question
   */


  _createClass(PopoverQuestion, [{
    key: 'changeStatePopoverOpen',
    value: function changeStatePopoverOpen() {
      this.setState({ popoverQuestionOpen: !this.state.popoverQuestionOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          popover = _props.popover,
          index = _props.index;

      return _react2.default.createElement(
        'div',
        { className: 'contentPopover' },
        _react2.default.createElement(
          _reactstrap.Button,
          { type: 'button', id: 'Popover' + index, className: 'contentQuestion', onClick: this.changeStatePopoverOpen },
          PopoverQuestion.questionImageSvg()
        ),
        _react2.default.createElement(
          _reactstrap.Popover,
          { placement: 'bottom', isOpen: this.state.popoverQuestionOpen, target: 'Popover' + index, toggle: this.changeStatePopoverOpen, className: 'ppPopover' },
          _react2.default.createElement(
            _reactstrap.PopoverHeader,
            { className: 'popover-title ppHeader' },
            popover.get('keycardTitle')
          ),
          _react2.default.createElement(
            _reactstrap.PopoverBody,
            { className: 'popover-content ppBody' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement('div', { className: 'col-xs-12', dangerouslySetInnerHTML: { __html: popover.get('keycardContent') } })
            )
          )
        )
      );
    }
  }]);

  return PopoverQuestion;
}(_react2.default.Component);

PopoverQuestion.propTypes = {
  popover: _propTypes.PropTypes.object.isRequired, // content for popover info keycard
  index: _propTypes.PropTypes.number.isRequired
};

exports.default = PopoverQuestion;
//# sourceMappingURL=PopoverQuestion.js.map