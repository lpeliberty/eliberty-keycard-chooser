import React from 'react';
import { PropTypes } from 'prop-types';
import { Map } from 'immutable';
import { injectIntl, intlShape } from 'react-intl';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';
/**
 * Double Mask
 */
class DoubleMask extends React.Component {
  /**
   * Display Error Message
   * @param errorKey
   * @param localItemInfo
   * @returns {*}
   */
  static renderedErrorInputMessage(errorKey, localItemInfo) {
    const error = localItemInfo.get('errors', new Map()).get(errorKey, '');

    return error.length === 0
      ? null
      : <span className="errorInputKeyCard">{error}</span>;
  }

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeAutoSuggestCardNumber = this.handleChangeAutoSuggestCardNumber.bind(this);
  }

  /**
   * Change card number
   * @param event
   * @param cardId
   */
  handleChangeCardNumber(event, cardId, card) {
    this.handleChangeAutoSuggestCardNumber(event.target.value, cardId, card, false);
  }

  /**
   *
   * @param cardnumber
   * @param cardId
   */
  handleChangeAutoSuggestCardNumber(cardnumber, cardId, card, suggest = true) {
    let newValue = '';

    this.props.localItemInfo.get('keycardsMask').forEach((item, key) => {
      if (key !== 'current' && key !== 'idCard' && key !== card) {
        if (suggest) {
          this.props.keycards.forEach((item, key) => {
            if (item.get('shortnumber') === cardnumber || item.get('cardnumber') === cardnumber) {
              newValue = card === 'sd' ? item.get('shortnumber') : item.get('cardnumber');
            }
          });
          this.props.updateKeycardsMask(this.props.orderitem.get('id'), key, newValue);
        } else {
          this.props.updateKeycardsMask(this.props.orderitem.get('id'), key, newValue);
        }
      }
    });

    if (typeof cardnumber !== 'undefined') {
      this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
      this.props.updateKeycardsMask(this.props.orderitem.get('id'), card, cardnumber);
    }
  }

  /**
   * Function to check the length of the card number entered according to the type of card
   * @param cardNumber
   * @param index
   * @param card
   * @returns {boolean}
   */
  verifyLengthKeycard(cardnumber, index, card) {
    const reg = new RegExp(/( )|(_)/g);
    const cardNumber = cardnumber.replace(reg, '');
    const errorKey = 'data.cardNumber';
    const { formatMessage } = this.props.intl;
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.length', defaultMessage: 'no lenght' });
    const currentId = this.props.localItemInfo.get('id');

    // verification the card type
    switch (card) {
      case tabKeycardType.sd: {
        if (cardNumber.length < 25) {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          return false;
        }
        break;
      }
      case tabKeycardType.ta:
      case tabKeycardType.alfi: {
        if (cardNumber.length < 16) {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          return false;
        }
        break;
      }
      case tabKeycardType.open: {
        if (cardNumber.length < 11) {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          return false;
        }
        break;
      }
      default: { break; }
    }
    return true;
  }

  /**
   * Display of the double input mask
   * @param card
   * @param index
   * @param keycards
   * @param params
   * @returns {XML}
   */
  renderedSomeInputKeyCards(card, index) {
    let className = 'tab-pane fade in';
    const lengthKeycard = false;
    const aux = `tabKeycardType[card]${index}`;
    const errorKey = 'data.cardNumber';
    const { formatMessage } = this.props.intl;
    const errorLabel = formatMessage({ id: 'rp.checkout.message.error.input.empty', defaultMessage: 'empty' });
    const currentId = this.props.localItemInfo.get('id');
    let cardNumber = this.props.localItemInfo.get('keycardsMask').get(card);

    if (cardNumber === null) {
      cardNumber = '';
    }

    if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
      className = `${className} active`;

      if (cardNumber !== '') {
        if (this.verifyLengthKeycard(cardNumber, index, tabKeycardType[card])) {
          this.props.deleteKeyFieldsErrors(currentId, errorKey);
        }
      } else {
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
      }

      this.props.changeCardNumber(currentId, cardNumber);
      this.props.updateKeycardsMask(currentId, 'current', card);
    }

    return (
      <div className={className} id={aux} role="tabpanel" key={index}>
        <CardNumberField
          key={index}
          id={index}
          mode={tabKeycardType[card]}
          keycards={this.props.keycards}
          handleChangeCardNumber={(event) => {
            this.handleChangeCardNumber(event, index, card);
          }}
          onChange={(event) => {
            this.handleChangeCardNumber(event, index, card);
          }}
          onAutoSuggestSelected={(cardnumber) => {
            this.handleChangeAutoSuggestCardNumber(cardnumber, index, card);
          }}
          cardNumber={cardNumber}
          value={cardNumber}
          params={this.props.params}
        />
        { cardNumber === '' || lengthKeycard === false ? DoubleMask.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : '' }
      </div>
    );
  }


  /**
   * Display labels for inputs - select active input
   * @param card
   * @param index
   * @returns {XML}
   */
  renderedLabelTab(card, index) {
    const aux = `card${index}`;
    let className = 'nav-item';

    if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
      className = `${className} active`;
    }

    return (
      <li className={className} key={index}>
        <a
          className="nav-link text-center"
          data-toggle="tab"
          role="tab"
          href={aux}
          onClick={() => {
            this.props.updateKeycardsMask(this.props.localItemInfo.get('id'), 'idCard', index);
          }}
        >{card}</a>
      </li>
    );
  }


  render() {
    const { keycardTypes } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs nav-justified responsive-tabs" role="tablist">
          { keycardTypes.map((card, index) => (
            this.renderedLabelTab(tabKeycardType[card], index)
          )) }
        </ul>
        <div className="tab-content">
          {
            keycardTypes.map((card, index) => (
              this.renderedSomeInputKeyCards(card, index)
            ))
          }
        </div>
      </div>
    );
  }
}

DoubleMask.propTypes = {
  keycards: PropTypes.object.isRequired,
  keycardTypes: PropTypes.object.isRequired, // keycards to display the tabs
  params: PropTypes.object.isRequired, // generic params
  localItemInfo: PropTypes.object.isRequired, // current local Item
  orderitem: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired, // function to change cardnumber of item
  updateKeycardsMask: PropTypes.func.isRequired, // function to update elements on a keycardsMask
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors,
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(DoubleMask);
