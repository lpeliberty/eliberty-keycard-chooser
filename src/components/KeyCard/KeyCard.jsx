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
    this.handleChangeCheckSwisspass = this.handleChangeCheckSwisspass.bind(this);
    this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
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
   * handle Change Check Swisspass
   */
  handleChangeCheckSwisspass() {
    const currentId = this.props.localItemInfo.get('skierIndex');
    const currentItem = this.props.localItemInfo.get('keycardsMask', new Map());
    const newValue = !currentItem.get('swisspassElem', new Map()).get('checked');

    this.props.updateSwissPassElem(currentId, 'checked', newValue);
  }

  /**
   * handle Change Zipcode
   * @param event
   */
  handleChangeZipcode(event) {
    const zipcode = event.target.value;

    const pattern = /^[0-9]{4}$/;
    const isValid = pattern.test(zipcode);

    const currentId = this.props.localItemInfo.get('skierIndex');
    this.props.updateSwissPassElem(currentId, 'zipcode', zipcode);
    this.props.updateSwissPassElem(currentId, 'zipcodeFormatValid', isValid);
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
    const skierIndex = this.props.orderitem.get('skierIndex');

    if (cardnumber !== undefined && typeof cardnumber !== 'undefined') {
      // Remove spaces on card number
      cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');

      // Update others card types values
      this.props.localItemInfo.get('keycardsMask').forEach((item, key) => {
        if (key !== 'current' && key !== 'idCard' && key !== type && key !== 'swisspassElem') {
          if (suggest) {
            this.props.keycards.forEach((element) => {
              if (element.get('shortnumber') === cardnumber || element.get('cardnumber') === cardnumber) {
                newValue = type === 'sd' ? element.get('shortnumber') : element.get('cardnumber');
              }
            });
          }
          this.props.updateKeycardsMask(skierIndex, key, newValue);
        }
      });

      // Delete errors
      this.props.deleteKeyFieldsErrors(currentId, errorKey);

      const cardType = tabKeycardType[type];
      const isSwissPass = cardType === tabKeycardType.swisspass;

      // verification keycard number is correct
      if (cardnumber !== '' || cardnumber !== undefined) {
        validKeycard = MaskHelper.verifyKeycard(cardnumber, cardId, cardType);
        // localitemInfo.validateKeycard
        this.props.updateValidatedKeycard(currentId, validKeycard);

        // Change localItemInfo.keycardMasks.swisspassElem.numberFormatValid
        if (isSwissPass) {
          this.props.updateSwissPassElem(currentId, 'numberFormatValid', validKeycard);
        } else {
          // localItemInfo.itemsDefinition.fields.cardNumber.valid
          this.props.updateValidField(currentId, 'cardNumber', validKeycard);
        }
        this.changeValidationCard(validKeycard);

        // Keycard mask is valid
        if (validKeycard) {
          // If no swisspass, we can validate keycard
          if (!isSwissPass) {
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
      // Change localItemInfo.values.cardNumber
      this.props.changeCardNumber(skierIndex, cardnumber);
      // Change localItemInfo.keycardMask.xxxxx
      this.props.updateKeycardsMask(skierIndex, type, cardnumber);
      if (isSwissPass) {
        this.props.updateSwissPassElem(skierIndex, 'number', cardnumber);
      }
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
   * @returns {null}
   */
  renderedContentForSwisspass() {
    return (this.props.localItemInfo.get('keycardsMask').get('current') === 'swisspass'
      ? <div className="contentSwisspass">
        <input
          type="text"
          name="zipcode-swiss"
          id="zipcode-swiss"
          className="form-control"
          maxLength="4"
          data-control="true"
          onChange={event => this.handleChangeZipcode(event)}
          value={CardTypeHelper.getSwissPassProperty(this.props.localItemInfo, 'zipcode')}
        />
        <label htmlFor="zipcode-swiss">
          <FormattedMessage id="rp.checkout.shippingaddress.zipcode" defaultMessage="Zipcode" />
        </label>
        <input
          type="checkbox"
          // value={CardTypeHelper.getSwissPassProperty(this.props.localItemInfo, 'checked') === true ? '1' : '0'}
          checked={CardTypeHelper.getSwissPassProperty(this.props.localItemInfo, 'checked')}
          name="check-swisspass"
          id="check-swisspass"
          // onChange={() => this.handleChangeCheckSwisspass()}
          onClick={() => this.handleChangeCheckSwisspass()}
        />
        <label htmlFor="check-swisspass" onChange={() => this.handleChangeCheckSwisspass()}>
          <FormattedMessage id="rp.checkout.keycard.swisspass.check.text" defaultMessage="I agree with the conditions of SwissPass" />
        </label>
        <button className="btn-swisspass">
          <FormattedMessage id="rp.checkout.keycard.swisspass.link" defaultMessage="Disclaimer" />
        </button>
      </div>
      : null
    );
  }

  render() {
    const { id, keycardPictureSrc, keycardTypes, fields, popover } = this.props;
    const { hasSupport } = this.state;

    return (
      <div className="blockPopover" key={id}>

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
                {fields.get('keycard').get('hasSupport', false) === true ?
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
  fields: PropTypes.object.isRequired,
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
  updateSwissPassElem: PropTypes.func.isRequired,
  hasSupport: PropTypes.bool.isRequired, // boolean to know if support exists
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(KeyCard);
