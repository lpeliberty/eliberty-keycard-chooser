import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Map } from 'immutable';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import PopoverQuestion from '../PopoverQuestion/PopoverQuestion';
import PopoverLink from '../PopoverLink/PopoverLink';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';
import * as MaskHelper from '../../helpers/MaskHelper';
import * as CardTypeHelper from '../../helpers/CardTypeHelper';

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
    return <p className="errorInputKeyCard">{error}</p>;
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
      valid: true,
    };
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeAutoSuggestCardNumber = this.handleChangeAutoSuggestCardNumber.bind(this);
    this.changeValidationCard = this.changeValidationCard.bind(this);
  }

  /**
   * Change local state when click support change value
   * @param checked
   */
  handleChangeToggle(checked) {
    this.setState({
      checkYes: checked,
      checkNo: !checked,
      hasSupport: !checked,
    });
    this.props.onChangeCheck(checked ? 'yes' : 'no');
  }

  /**
   * Change card number
   * @param event
   * @param cardId
   * @param type
   */
  handleChangeCardNumber(event, cardId, type) {
    this.handleChangeAutoSuggestCardNumber(event.target.value, cardId, type, false);
  }

  /**
   *
   * @param cardnumber
   * @param cardId
   * @param type
   * @param suggest
   */
  handleChangeAutoSuggestCardNumber(cardnumber, cardId, type, suggest = true) {
    let newValue = '';
    let validKeycard = this.props.localItemInfo.get('validateKeycard');
    const { formatMessage } = this.props.intl;
    const errorKey = 'data.cardNumber';
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'invalid' });
    const currentId = this.props.localItemInfo.get('skierIndex');

    if (cardnumber !== undefined && typeof cardnumber !== 'undefined') {
      // Remove spaces on card number
      cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');

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
          this.props.updateKeycardsMask(this.props.orderitem.get('skierIndex'), key, newValue);
        }
      });

      // Delete errors
      this.props.deleteKeyFieldsErrors(currentId, errorKey);

      // verification keycard number is correct
      if (cardnumber !== '' || cardnumber !== undefined) {
        const cardType = tabKeycardType[type];
        validKeycard = MaskHelper.verifyKeycard(cardnumber, cardId, cardType);
        this.props.updateValidatedKeycard(currentId, validKeycard);
        this.props.updateValidField(currentId, 'cardNumber', validKeycard);
        this.changeValidationCard(validKeycard);

        // Keycard mask is valid
        if (validKeycard) {
          // If no swisspass, we can validate keycard
          if (cardType !== tabKeycardType.swisspass) {
            this.props.validateKeycard(currentId, cardnumber);
          } else if (CardTypeHelper.canCheckSwissPass(this.props.localItemInfo)) {
            const zipCode = CardTypeHelper.getSwissPassProperty('zipcode');
            this.props.validateKeycard(currentId, cardnumber, zipCode);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }
      } else {
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
      }
      // Update current card type value
      // if (typeof cardnumber !== 'undefined') {
      this.props.changeCardNumber(this.props.orderitem.get('skierIndex'), cardnumber);
      this.props.updateKeycardsMask(this.props.orderitem.get('skierIndex'), type, cardnumber);
      // }
    }
  }

  /**
   *
   * @param value
   */
  changeValidationCard(value) {
    this.setState({ valid: value });
  }

  /**
   * Content for popover link
   * @returns {*}
   */
  renderedLabelLinkPopover() {
    return this.props.popoverLink.get('labelKeycardInfo') !== null
      ? <PopoverLink popoverLink={this.props.popoverLink} index={this.props.orderitem.get('skierIndex')} />
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
        validInput={this.state.valid}
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
    const currentId = this.props.localItemInfo.get('skierIndex');
    const errorKey = 'data.cardNumber';
    let cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);

    if (cardNumber === null || typeof cardNumber === 'undefined') {
      cardNumber = '';
    }

    // Remove spaces on card number
    cardNumber = cardNumber.replace(new RegExp(/( )|(_)/g), '');

    // active tab on select
    if (index === this.props.localItemInfo.get('keycardsMask').get('idCard')) {
      className = `${className} active`;
      this.props.changeCardNumber(currentId, cardNumber);
      this.props.updateKeycardsMask(currentId, 'current', type);
    }

    return (
      <div className={className} id={aux} role="tabpanel" key={index}>
        { this.renderedCardNumberField(index, type, cardNumber) }
        { this.state.checkYes ? this.renderedLabelLinkPopover() : '' }
        { cardNumber === '' || this.props.localItemInfo.get('validateKeycard') === false ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo) : '' }
      </div>
    );
  }

  /**
   * Display of the simple input mask
   * @param type
   * @param index
   * @returns {*}
   */
  renderedInputOneKeyCard(type, index) {
    let validKeycard = false;
    const errorKey = 'data.cardNumber';
    const { formatMessage } = this.props.intl;
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'empty' });
    const currentId = this.props.localItemInfo.get('skierIndex');
    let cardNumber = this.props.localItemInfo.get('keycardsMask').get(type);

    if (cardNumber === null) {
      cardNumber = '';
    }

    this.props.updateKeycardsMask(currentId, 'current', type);
    /*
        if (cardNumber !== '') {
          validKeycard = MaskHelper.verifyKeycard(cardNumber, index, tabKeycardType[type]);
          if (validKeycard) {
            this.props.validateKeycard(currentId, cardNumber);
            this.props.deleteKeyFieldsErrors(currentId, errorKey);
          }
        } else {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }
    */
    return (
      <div key={index}>
        { this.renderedCardNumberField(index, type, cardNumber) }
        { this.state.checkYes ? this.renderedLabelLinkPopover() : '' }
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
            this.props.updateKeycardsMask(this.props.localItemInfo.get('skierIndex'), 'idCard', index);
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

  /**
   *
   * @param zipcode
   * @returns {boolean}
   */
  static verifyZipcode(zipcode) {
    const patternZipcode = /^[0-9]{4}$/;
    return !patternZipcode.test(zipcode);
  }

  /**
   *
   * @returns {string}
   */
  renderedContentForSwisspass() {
    return (this.props.localItemInfo.get('keycardsMask').get('current') === "swisspass"
        ? <div className="contentSwisspass">
            <input type="text" name="zipcode-swiss" id="zipcode-swiss" className="form-control" maxLength="4" data-control="true" />
            <label htmlFor="zipcode-swiss">
              <FormattedMessage id="rp.checkout.shippingaddress.zipcode" defaultMessage="Zipcode" />
            </label>
            <input type="checkbox" value="1" name="check-swisspass" id="check-swisspass" />
            <label htmlFor="check-swisspass">
              <FormattedMessage id="rp.checkout.keycard.swisspass.check.text" defaultMessage="I agree with the conditions of SwissPass" />
            </label>
          </div>
        : null
    );
  }

  render() {
    const { id, keycardPictureSrc, keycardTypes, itemFieldsDefinition, popover } = this.props;
    const { hasSupport } = this.state;

    return (
      <div className="blockPopover test" key={id}>

        <div className="col-xs-4 keyCardAreaImage">
          <img src={keycardPictureSrc} alt="keycardPicture" />
        </div>
        <div className="row">
          <form className="col-xs-12">
            <div>
              <div className="keycard_area_title">
                <div className="keycardMessage">
                  <FormattedMessage id="rp.checkout.keycard.area.question" defaultMessage="I have a card" />
                  <PopoverQuestion popover={popover} index={this.props.orderitem.get('skierIndex')} />
                </div>
                {itemFieldsDefinition.get('keycard').get('hasSupport', false) === true ?
                  <Switch
                    on={!hasSupport}
                    onClick={() => {
                      this.handleChangeToggle(hasSupport);
                    }}
                  />
                  : ''
                }
              </div>
            </div>

            <div>
              <div className="col-xs-8 form-group keyCardAreaForm">
                { this.renderedContentCheckNo() }

                {this.state.checkYes
                  ? <div className="msgCheckYes">
                    { this.renderedListKeyCard(keycardTypes) }
                    { this.renderedContentForSwisspass() }
                  </div>
                  : ''}
              </div>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

KeyCard.propTypes = {
  id: PropTypes.string.isRequired, // index
  keycardPictureSrc: PropTypes.string.isRequired, // keycard picture src
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
  updateValidField: PropTypes.func.isRequired, //
  hasSupport: PropTypes.bool.isRequired, // boolean to know if support exists
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(KeyCard);
