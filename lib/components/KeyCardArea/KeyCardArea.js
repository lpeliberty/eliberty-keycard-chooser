'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _immutable = require('immutable');

var _reactSvgInline = require('react-svg-inline');

var _reactSvgInline2 = _interopRequireDefault(_reactSvgInline);

var _CardNumberField = require('../CardNumberField/CardNumberField');

var _CardNumberField2 = _interopRequireDefault(_CardNumberField);

var _questionImg = require('../images/questionImg');

var _questionImg2 = _interopRequireDefault(_questionImg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './KeyCardArea.scss';

/**
 * Keycard area
 */
var KeyCardArea = function (_React$Component) {
  _inherits(KeyCardArea, _React$Component);

  function KeyCardArea(props) {
    _classCallCheck(this, KeyCardArea);

    var _this = _possibleConstructorReturn(this, (KeyCardArea.__proto__ || Object.getPrototypeOf(KeyCardArea)).call(this, props));

    _this.state = {
      checkYes: false,
      checkNo: false,
      idCard: 0,
      cardNumberList: new _immutable.Map()
    };
    _this.handleClickCheckYes = _this.handleClickCheckYes.bind(_this);
    _this.handleClickCheckNo = _this.handleClickCheckNo.bind(_this);
    _this.handleChangeCardNumber = _this.handleChangeCardNumber.bind(_this);
    _this.handleChangeAutoSuggestCardNumber = _this.handleChangeAutoSuggestCardNumber.bind(_this);
    return _this;
  }

  _createClass(KeyCardArea, [{
    key: 'handleClickCheckYes',
    value: function handleClickCheckYes() {
      this.setState({
        checkYes: true,
        checkNo: false
      });
    }
  }, {
    key: 'handleClickCheckNo',
    value: function handleClickCheckNo() {
      this.setState({
        checkYes: false,
        checkNo: true
      });
    }
  }, {
    key: 'handleChangeCardNumber',
    value: function handleChangeCardNumber(event, cardId) {
      this.handleChangeAutoSuggestCardNumber(event.target.value, cardId);
    }
  }, {
    key: 'handleChangeAutoSuggestCardNumber',
    value: function handleChangeAutoSuggestCardNumber(cardnumber, cardId) {
      if (typeof cardnumber !== 'undefined') {
        var cardNumberList = this.state.cardNumberList;

        if (cardnumber.substr(0, 1) !== '_') {
          cardNumberList = new _immutable.Map();
        }

        cardNumberList = cardNumberList.set(cardId, cardnumber);
        this.setState({ cardNumberList: cardNumberList });
        this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
      }
    }
  }, {
    key: 'renderedContentCheckNo',
    value: function renderedContentCheckNo() {
      return this.state.checkNo ? _react2.default.createElement(
        'div',
        { className: 'msgCheckNo' },
        _react2.default.createElement(
          'p',
          null,
          'Vous ne disposez pas de carte pour ce skieur, elle vous sera livr\xE9e ou mise \xE0 disposition.'
        )
      ) : '';
    }
  }, {
    key: 'renderedLabelTab',
    value: function renderedLabelTab(card) {
      var _this2 = this;

      var aux = 'card' + card.get('id');
      var className = 'nav-item';

      if (card.get('id') === this.state.idCard) {
        className = className + ' active';
      }

      return _react2.default.createElement(
        'li',
        { className: className, key: card.get('id') },
        _react2.default.createElement(
          'a',
          {
            className: 'nav-link text-center',
            'data-toggle': 'tab',
            role: 'tab',
            href: aux,
            onClick: function onClick() {
              _this2.setState({
                idCard: card.get('id')
              });
            }
          },
          card.get('label')
        )
      );
    }
  }, {
    key: 'renderedKeyCardsTypesSome',
    value: function renderedKeyCardsTypesSome(card, cardNumberList, keycards, params) {
      var _this3 = this;

      var aux = 'card' + card.get('id');
      var className = 'tab-pane fade in';
      if (card.get('id') === this.state.idCard) {
        className = className + ' active';
      }
      var cardNumber = cardNumberList.get(card.get('id'), '');
      return _react2.default.createElement(
        'div',
        { className: className, id: aux, role: 'tabpanel', key: card.get('id') },
        _react2.default.createElement(_CardNumberField2.default, {
          id: card.get('id'),
          mode: card.get('type').toUpperCase(),
          keycards: keycards,
          handleChangeCardNumber: function handleChangeCardNumber(event) {
            _this3.handleChangeCardNumber(event, card.get('id'));
          },
          onChange: function onChange(event) {
            _this3.handleChangeCardNumber(event, card.get('id'));
          },
          onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
            _this3.handleChangeAutoSuggestCardNumber(cardnumber, card.get('id'));
          },
          cardNumber: cardNumber.toUpperCase(),
          value: cardNumber,
          params: params
        })
      );
    }
  }, {
    key: 'renderedKeyCardsTypesOne',
    value: function renderedKeyCardsTypesOne(card, cardNumberList, params) {
      var _this4 = this;

      var cardNumber = cardNumberList.get(card.get('id'), '');
      return _react2.default.createElement(_CardNumberField2.default, {
        id: card.get('id'),
        mode: card.get('type').toUpperCase(),
        handleChangeCardNumber: function handleChangeCardNumber(event) {
          _this4.handleChangeCardNumber(event, card.get('id'));
        },
        onChange: function onChange(event) {
          _this4.handleChangeCardNumber(event, card.get('id'));
        },
        onAutoSuggestSelected: function onAutoSuggestSelected(cardnumber) {
          _this4.handleChangeAutoSuggestCardNumber(cardnumber, card.get('id'));
        },
        cardNumber: cardNumber.toUpperCase(),
        value: cardNumber,
        params: params
      });
    }
  }, {
    key: 'renderedListKeyCard',
    value: function renderedListKeyCard(keycardTypes, cardNumberList, keycards, params) {
      var _this5 = this;

      return keycardTypes.size > 1 ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs nav-justified responsive-tabs', role: 'tablist' },
          keycardTypes.map(function (card) {
            return _this5.renderedLabelTab(card);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-content' },
          keycardTypes.map(function (card) {
            return _this5.renderedKeyCardsTypesSome(card, cardNumberList, keycards, params);
          })
        )
      ) : keycardTypes.map(function (card) {
        return _this5.renderedKeyCardsTypesOne(card, cardNumberList, params);
      });
    }
  }, {
    key: 'renderedContentCheckYes',
    value: function renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params) {
      return this.state.checkYes ? _react2.default.createElement(
        'div',
        { className: 'msgCheckYes' },
        this.renderedListKeyCard(keycardTypes, cardNumberList, keycards, params),
        _react2.default.createElement(
          'a',
          { href: '#', className: 'infoKeyCard' },
          _react2.default.createElement(
            'span',
            null,
            'O\xF9 trouver mon num\xE9ro de carte ?'
          )
        )
      ) : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props = this.props,
          keycardTypes = _props.keycardTypes,
          keycards = _props.keycards,
          params = _props.params;
      var cardNumberList = this.state.cardNumberList;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'J\'ai une carte mains libres*'
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'contentQuestion', 'data-toggle': 'modal', 'data-target': '#myModal' },
            _questionImg2.default
          ),
          _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'form-group keyCardAreaForm' },
              _react2.default.createElement('input', { type: 'radio', id: 'inputCheckOui', name: 'card', value: 'oui', onClick: function onClick() {
                  _this6.handleClickCheckYes();
                } }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'inputCheckOui', className: 'keycardChoice' },
                'oui'
              ),
              _react2.default.createElement('input', { type: 'radio', id: 'inputCheckNo', name: 'card', value: 'non', onClick: function onClick() {
                  _this6.handleClickCheckNo();
                } }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'inputCheckNo', className: 'keycardChoice' },
                'non'
              ),
              this.renderedContentCheckNo(),
              this.renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params)
            )
          )
        )
      );
    }
  }]);

  return KeyCardArea;
}(_react2.default.Component);

exports.default = KeyCardArea;
//# sourceMappingURL=KeyCardArea.js.map