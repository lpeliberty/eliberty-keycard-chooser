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
 * PopoverLink
 */
var PopoverLink = function (_React$Component) {
  _inherits(PopoverLink, _React$Component);

  /**
   * Constructor
   * @param props
   */
  function PopoverLink(props) {
    _classCallCheck(this, PopoverLink);

    var _this = _possibleConstructorReturn(this, (PopoverLink.__proto__ || Object.getPrototypeOf(PopoverLink)).call(this, props));

    _this.state = {
      popoverLinkOpen: false
    };
    _this.changeStatePopoverLinkOpen = _this.changeStatePopoverLinkOpen.bind(_this);
    return _this;
  }

  /**
   * Change local state for open popover link
   */


  _createClass(PopoverLink, [{
    key: 'changeStatePopoverLinkOpen',
    value: function changeStatePopoverLinkOpen() {
      this.setState({ popoverLinkOpen: !this.state.popoverLinkOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'contentInfoKeycard' },
        _react2.default.createElement(
          'a',
          { href: '#', className: 'infoKeyCard', id: 'PopoverLink', onClick: this.changeStatePopoverLinkOpen },
          _react2.default.createElement(
            'span',
            null,
            this.props.popoverLink.get('labelKeycardInfo')
          )
        ),
        _react2.default.createElement(
          _reactstrap.Popover,
          { placement: 'bottom', isOpen: this.state.popoverLinkOpen, target: 'PopoverLink', toggle: this.changeStatePopoverLinkOpen, className: 'ppPopover' },
          _react2.default.createElement(
            _reactstrap.PopoverHeader,
            { className: 'popover-title ppHeader' },
            this.props.popoverLink.get('popoverTitleKeycardInfo')
          ),
          _react2.default.createElement(
            _reactstrap.PopoverBody,
            { className: 'popover-content ppBody' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-4' },
                _react2.default.createElement('img', { className: 'img-responsive', src: this.props.popoverLink.get('picKeycardInfo'), alt: '' })
              ),
              _react2.default.createElement('div', { className: 'col-xs-8', dangerouslySetInnerHTML: { __html: this.props.popoverLink.get('descKeycardInfo') } })
            )
          )
        )
      );
    }
  }]);

  return PopoverLink;
}(_react2.default.Component);

PopoverLink.propTypes = {
  popoverLink: _propTypes.PropTypes.object.isRequired // content for popover info keycard
};

exports.default = PopoverLink;
//# sourceMappingURL=PopoverLink.js.map