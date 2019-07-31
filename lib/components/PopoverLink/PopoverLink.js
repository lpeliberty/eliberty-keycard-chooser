"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * PopoverLink
 */
var PopoverLink =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PopoverLink, _React$Component);

  /**
   * Constructor
   * @param props
   */
  function PopoverLink(props) {
    var _this;

    _classCallCheck(this, PopoverLink);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopoverLink).call(this, props));
    _this.state = {
      popoverLinkOpen: false
    };
    _this.changeStatePopoverLinkOpen = _this.changeStatePopoverLinkOpen.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Change local state for open popover link
   */


  _createClass(PopoverLink, [{
    key: "changeStatePopoverLinkOpen",
    value: function changeStatePopoverLinkOpen() {
      this.setState({
        popoverLinkOpen: !this.state.popoverLinkOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index;
      return _react["default"].createElement("div", {
        className: "contentInfoKeycard"
      }, _react["default"].createElement("a", {
        href: "#",
        className: "infoKeyCard",
        id: "PopoverLink".concat(index),
        onClick: this.changeStatePopoverLinkOpen
      }, _react["default"].createElement("span", null, this.props.popoverLink.get('labelKeycardInfo'))), _react["default"].createElement(_reactstrap.Popover, {
        placement: "bottom",
        isOpen: this.state.popoverLinkOpen,
        target: "PopoverLink".concat(index),
        toggle: this.changeStatePopoverLinkOpen,
        className: "ppPopover"
      }, _react["default"].createElement(_reactstrap.PopoverHeader, {
        className: "popover-title ppHeader"
      }, this.props.popoverLink.get('popoverTitleKeycardInfo')), _react["default"].createElement(_reactstrap.PopoverBody, {
        className: "popover-content ppBody"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xs-4"
      }, _react["default"].createElement("img", {
        className: "img-responsive",
        src: this.props.popoverLink.get('picKeycardInfo'),
        alt: ""
      })), _react["default"].createElement("div", {
        className: "col-xs-8",
        dangerouslySetInnerHTML: {
          __html: this.props.popoverLink.get('descKeycardInfo')
        }
      })))));
    }
  }]);

  return PopoverLink;
}(_react["default"].Component);

PopoverLink.propTypes = {
  popoverLink: _propTypes.PropTypes.object.isRequired,
  // content for popover info keycard
  index: _propTypes.PropTypes.number.isRequired
};
var _default = PopoverLink;
exports["default"] = _default;
//# sourceMappingURL=PopoverLink.js.map