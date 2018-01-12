import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Map } from 'immutable';
import PopoverQuestion from '../PopoverQuestion/PopoverQuestion';
import PopoverLink from '../PopoverLink/PopoverLink';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';
import * as MaskHelper from '../../helpers/MaskHelper';


/**
 * Keycard
 */
class KeyCard extends React.Component {
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

    this.state = {
      checkYes: !props.hasSupport,
      checkNo: props.hasSupport,
      hasSupport: props.hasSupport,
    };
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeAutoSuggestCardNumber = this.handleChangeAutoSuggestCardNumber.bind(this);
  }


  /**
   * Change local state when click on yes
   */
  handleClickCheckYes() {
    this.setState({
      checkYes: true,
      checkNo: false,
      hasSupport: false,
    });
    this.props.onChangeCheck('yes');
  }

  /**
   * Change local state when click on no
   */
  handleClickCheckNo() {
    this.setState({
      checkYes: false,
      checkNo: true,
      hasSupport: true,
    });
    this.props.onChangeCheck('no');
  }

  /**
   * Change card number
   * @param event
   * @param cardId
   */
  handleChangeCardNumber(event, cardId, type) {
    this.handleChangeAutoSuggestCardNumber(event.target.value, cardId, type, false);
  }

  /**
   *
   * @param cardnumber
   * @param cardId
   */
  handleChangeAutoSuggestCardNumber(cardnumber, cardId, type, suggest = true) {
    let newValue = '';
    let validKeycard = this.props.localItemInfo.get('validateKeycard');
    const { formatMessage } = this.props.intl;
    const errorKey = 'data.cardNumber';
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'invalid' });
    const currentId = this.props.localItemInfo.get('id');

    if (cardnumber !== undefined) {
      // Remove spaces on card number
      cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');

      console.log('suggest', suggest);
      console.log('handleChangeAutoSuggestCardNumber', cardnumber);

      // Update others card types values
      this.props.localItemInfo.get('keycardsMask').forEach((item, key) => {
        if (key !== 'current' && key !== 'idCard' && key !== type) {
          if (suggest) {
            this.props.keycards.forEach((element) => {
              if (element.get('shortnumber') === cardnumber || element.get('cardnumber') === cardnumber) {
                newValue = type === 'sd' ? element.get('shortnumber') : element.get('cardnumber');
              }
            });
          }
          this.props.updateKeycardsMask(this.props.orderitem.get('id'), key, newValue);
        }
      });
      // verification keycard number is correct
      if (cardnumber !== '' || cardnumber !== undefined) {
        validKeycard = MaskHelper.verifyKeycard(cardnumber, cardId, tabKeycardType[type]);
        this.props.updateValidatedKeycard(currentId, validKeycard);

        console.log('validKeycard', MaskHelper.verifyKeycard(cardnumber, cardId, tabKeycardType[type]));

        if (validKeycard) {
          this.props.validateKeycard(currentId, cardnumber);
          if (this.props.localItemInfo.get('validateKeycard') === true) {
            this.props.deleteKeyFieldsErrors(currentId, errorKey);
          } else {
            this.props.updateValidatedKeycard(currentId, validKeycard);
            this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }
      } else {
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
      }
      // Update current card type value
      // if (typeof cardnumber !== 'undefined') {
      this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
      this.props.updateKeycardsMask(this.props.orderitem.get('id'), type, cardnumber);
      // }
    }
  }

  /**
   * Content for popover link
   * @returns {*}
   */
  renderedLabelLinkPopover() {
    return this.props.popoverLink.get('labelKeycardInfo') !== null
      ? <PopoverLink popoverLink={this.props.popoverLink} />
      : '';
  }

  /**
   *
   * @param index
   * @param type
   * @param cardNumber
   * @param errorKey
   * @param className
   */
  renderedCardNumberField(index, type, cardNumber) {
    return (
      <CardNumberField
        key={index}
        id={index}
        mode={tabKeycardType[type]}
        keycards={this.props.keycards}
        handleChangeCardNumber={(event) => {
          this.handleChangeCardNumber(event, index, type);
        }}
        onChange={(event) => {
          this.handleChangeCardNumber(event, index, type);
        }}
        onAutoSuggestSelected={(cardnumber) => {
          this.handleChangeAutoSuggestCardNumber(cardnumber, index, type);
        }}
        cardNumber={cardNumber}
        value={cardNumber}
        params={this.props.params}
      />
    );
  }


  /**
   * Display of the double input mask
   * @param card
   * @param index
   * @param keycards
   * @param params
   * @returns {XML}
   */
  renderedSomeInputKeyCards(type, index) {
    let className = 'tab-pane fade in';
    const aux = `tabKeycardType[type]${index}`;
    const currentId = this.props.localItemInfo.get('id');
    const errorKey = 'data.cardNumber';
    let cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);
    // Remove spaces on card number
    cardNumber = cardNumber.replace(new RegExp(/( )|(_)/g), '');

    if (cardNumber === null) {
      cardNumber = '';
    }

    if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
      className = `${className} active`;
      this.props.changeCardNumber(currentId, cardNumber);
      this.props.updateKeycardsMask(currentId, 'current', type);
    }

    return (
      <div className={className} id={aux} role="tabpanel" key={index}>
        { this.renderedCardNumberField(index, type, cardNumber) }
        { cardNumber === '' || this.props.localItemInfo.get('validateKeycard') === false ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : '' }
      </div>
    );
  }

  /**
   *
   * @param type
   * @param index
   * @returns {*}
   */
  renderedInputOneKeyCard(type, index) {
    let validKeycard = false;
    const errorKey = 'data.cardNumber';
    const { formatMessage } = this.props.intl;
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'empty' });
    const currentId = this.props.localItemInfo.get('id');
    const cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);

    this.props.updateKeycardsMask(currentId, 'current', type);

    if (cardNumber !== '') {
      validKeycard = MaskHelper.verifyKeycard(cardNumber, index, tabKeycardType[type]);
      if (validKeycard) {
        this.props.validateKeycard(currentId, cardNumber);
        this.props.deleteKeyFieldsErrors(currentId, errorKey);
      }
    } else {
      this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
    }

    return (
      <div>
        { this.renderedCardNumberField(index, type, cardNumber) }
        { cardNumber === '' || this.props.localItemInfo.get('validateKeycard') === false ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : '' }
      </div>
    );
  }

  /**
   * Display labels for inputs - select active input
   * @param card
   * @param index
   * @returns {XML}
   */
  renderedLabelTab(type, index) {
    const aux = `type${index}`;
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
        >{type}</a>
      </li>
    );
  }

  /**
   *
   * @param keycardTypes
   * @param keycards
   * @param params
   * @returns {XML}
   */
  renderedListKeyCard(keycardTypes) {
    return (keycardTypes.size > 1
        ? ( // Display Double Mask KeyCard
          <div>
            <ul className="nav nav-tabs nav-justified responsive-tabs" role="tablist">
              { keycardTypes.map((type, index) => (
                this.renderedLabelTab(tabKeycardType[type], index)
              )) }
            </ul>
            <div className="tab-content">
              {
                keycardTypes.map((type, index) => (
                  this.renderedSomeInputKeyCards(type, index)
                ))
              }
            </div>
          </div>
        ) :
        keycardTypes.map((type, index) => ( // Display one Input for keyCard
          this.renderedInputOneKeyCard(type, index)
        ))
    );
  }

  /**
   * Display content checked no
   * @returns {*}
   */
  renderedContentCheckNo() {
    return (this.state.checkNo
        ? <div className="msgCheckNo">
          <p>
            <FormattedMessage id="rp.checkout.ordercustom.nokeycard" defaultMessage="no card" />
          </p>
        </div>
        : ''
    );
  }


  render() {
    const { keycardTypes, itemFieldsDefinition, popover } = this.props;
    const { hasSupport } = this.state;

    let checkSupportYes = '';
    let checkSupportNo = '';
    if (hasSupport) {
      checkSupportNo = 'checked';
    } else {
      checkSupportYes = 'checked';
    }

    return (
      <div>
        <div className="blockPopover">
          <p><FormattedMessage id="rp.checkout.keycard.area.question" defaultMessage="I have a card" /></p>

          <PopoverQuestion popover={popover} />

          <form>
            <div className="form-group keyCardAreaForm">
              {itemFieldsDefinition.get('keycard').get('forceReloading') === false ?
                <div>
                  <input type="radio" id={`inputCheckYes${this.props.orderitem.get('id')}`} name="card" checked={checkSupportYes} value="yes" onChange={() => { this.handleClickCheckYes(); }} />
                  <label htmlFor={`inputCheckYes${this.props.orderitem.get('id')}`} className="keycardChoice"><FormattedMessage id="rp.checkout.keycard.area.reponse.yes" defaultMessage="yes" /></label>
                  <input type="radio" id={`inputCheckNo${this.props.orderitem.get('id')}`} name="card" value="non" checked={checkSupportNo} onChange={() => { this.handleClickCheckNo(); }} />
                  <label htmlFor={`inputCheckNo${this.props.orderitem.get('id')}`} className="keycardChoice"><FormattedMessage id="rp.checkout.keycard.area.reponse.no" defaultMessage="no" /></label>
                </div>
                : ''
              }

              { this.renderedContentCheckNo() }

              {this.state.checkYes
                ? <div className="msgCheckYes">
                  { this.renderedListKeyCard(keycardTypes) }
                  { this.renderedLabelLinkPopover() }
                </div>
                : ''}

            </div>
          </form>
        </div>
      </div>
    );
  }
}

KeyCard.propTypes = {
  keycardTypes: PropTypes.object.isRequired, // keycards to display the tabs
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired, // generic params
  orderitem: PropTypes.object.isRequired,
  itemFieldsDefinition: PropTypes.object.isRequired,
  popover: PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: PropTypes.object.isRequired, // content for popover link keycard
  localItemInfo: PropTypes.object.isRequired, // current local Item
  changeCardNumber: PropTypes.func.isRequired, // function to change cardnumber of item
  onChangeCheck: PropTypes.func.isRequired, // function to make changes when checking
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  updateKeycardsMask: PropTypes.func.isRequired, // function to update elements on a keycardsMask
  // validateKeycard: function call api for verification of keycard number
  validateKeycard: PropTypes.func.isRequired,
  // updateValidatedKeycard: function to change boolean value of keycard number
  updateValidatedKeycard: PropTypes.func.isRequired,
  hasSupport: PropTypes.bool.isRequired, // boolean to know if support exists
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(KeyCard);
