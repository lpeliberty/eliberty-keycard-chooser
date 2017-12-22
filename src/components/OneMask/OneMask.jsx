import React from 'react';
import { PropTypes } from 'prop-types';
import { Map } from 'immutable';
import { injectIntl, intlShape } from 'react-intl';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';

/**
 * One Mask
 */
class OneMask extends React.Component {
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

  render() {
    const {
      keycards,
      params,
      card,
      index,
      localItemInfo,
      updateKeycardsMask,
      deleteKeyFieldsErrors,
      updateFieldsErrors,
    } = this.props;

    let lengthKeycard = false;
    const errorKey = 'data.cardNumber';
    const { formatMessage } = this.props.intl;
    const errorLabel = formatMessage({ id: 'rp.checkout.message.error.input.empty', defaultMessage: 'empty' });
    const currentId = localItemInfo.get('id');
    const cardNumber = localItemInfo.get('keycardsMask').get(card);

    updateKeycardsMask(currentId, 'current', card);

    if (cardNumber !== '') {
      lengthKeycard = this.verifyLengthKeycard(cardNumber, index, tabKeycardType[card]);

      if (lengthKeycard === true) {
        deleteKeyFieldsErrors(currentId, errorKey);
      }
    } else {
      updateFieldsErrors(currentId, errorKey, errorLabel);
    }

    return (
      <div>
        <CardNumberField
          key={index}
          id={index}
          mode={tabKeycardType[card]}
          keycards={keycards}
          handleChangeCardNumber={(event) => {
            this.handleChangeCardNumber(event, index, card);
          }}
          onChange={(event) => {
            this.handleChangeCardNumber(event, index, card);
          }}
          onAutoSuggestSelected={(cardnumber) => {
            this.handleChangeAutoSuggestCardNumber(cardnumber, index, card);
          }}
          cardNumber={cardNumber.toUpperCase()}
          value={cardNumber}
          params={params}
        />
        {cardNumber === '' || lengthKeycard === false ? OneMask.renderedErrorInputMessage(errorKey, localItemInfo) : ''}
      </div>
    );
  }
}

OneMask.propTypes = {
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired, // generic params
  localItemInfo: PropTypes.object.isRequired, // current local Item
  orderitem: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired, // function to change cardnumber of item
  updateKeycardsMask: PropTypes.func.isRequired, // function to update elements on a keycardsMask
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors,
  card: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(OneMask);
