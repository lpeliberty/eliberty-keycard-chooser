import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape, FormattedHTMLMessage } from 'react-intl';
import { Map } from 'immutable';
import MaskedInput from 'react-text-mask';
import Switch from 'react-toggle-switch';
import PopoverQuestion from '../PopoverQuestion/PopoverQuestion';
import PopoverLink from '../PopoverLink/PopoverLink';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';
import * as MaskHelper from '../../helpers/MaskHelper';
import {
  isCurrentCardNumberType,
  getCurrentCardNumberValue,
  isCurrentCardNumberValid,
  getCardNumberTypes,
  getCardNumberTypeElementProperty,
  isSwissPassPropertyValid,
} from '../../helpers/CardTypeHelper';

const configs = {
  ZIPCODE: {
    placeholder: '0000',
    mask: [
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ],
  },
};

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
   *
   * @param event
   * @param type
   */
  handleChangeCardNumber(event, type) {
    this.handleChangeAutoSuggestCardNumber(event.target.value, type, false);
  }

  /**
   * handle Change Check Swisspass
   */
  handleChangeCheckSwisspass() {
    const type = 'swisspass';
    const property = 'checked';
    const currentId = this.props.localItemInfo.get('skierIndex');
    const newValue = !getCardNumberTypeElementProperty(this.props.localItemInfo, type, property);

    this.props.stateUpdateCardNumberTypeProperty(currentId, type, property, newValue);

    this.props.checkValidKeycard(currentId);
  }

  /**
   * handle Change Zipcode
   * @param event
   */
  handleChangeZipcode(event) {
    const type = 'swisspass';
    const zipCode = event.target.value;
    const errorKey = 'data.swisspass.zipcode';

    const currentId = this.props.localItemInfo.get('skierIndex');
    this.props.stateUpdateCardNumberTypeProperty(currentId, type, 'zipcode', zipCode);

    const pattern = /^[0-9]{4}$/;
    const isValid = pattern.test(zipCode);
    this.props.stateUpdateCardNumberTypeProperty(currentId, type, 'zipcodeFormatValid', isValid);

    // Delete errors
    this.props.deleteKeyFieldsErrors(currentId, errorKey);

    if (!isValid) {
      const { formatMessage } = this.props.intl;
      const errorLabel = formatMessage({ id: 'rp.checkout.customize.swisspass.zipcode.invalid', defaultMessage: 'invalid' });
      this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
    } else {
      this.props.checkValidKeycard(currentId);
    }
  }

  /**
   *
   * @param cardnumber
   * @param type
   * @param suggest
   */
  handleChangeAutoSuggestCardNumber(cardnumber, type, suggest = true) {
    let newValue = '';
    const { formatMessage } = this.props.intl;
    const errorKey = 'data.cardNumber';
    const errorLabel = formatMessage({ id: 'rp.checkout.customize.cardnumber.invalid', defaultMessage: 'invalid' });
    const currentId = this.props.localItemInfo.get('skierIndex');
    const skierIndex = this.props.orderitem.get('skierIndex');

    let validKeycard = getCardNumberTypeElementProperty(this.props.localItemInfo, type, 'formatValid');

    if (cardnumber !== undefined && typeof cardnumber !== 'undefined') {
      // Remove spaces on card number
      cardnumber = cardnumber.replace(new RegExp(/( )|(_)/g), '');
      // Force SwissPass number to uppercase
      if (type === 'swisspass') {
        cardnumber = cardnumber.toUpperCase();
      }

      // Update others card types values
      getCardNumberTypes(this.props.localItemInfo).forEach((item, key) => {
        if (![type, 'swisspass'].includes(key)) {
          if (suggest) {
            this.props.keycards.forEach((element) => {
              if (element.get('shortnumber') === cardnumber || element.get('cardnumber') === cardnumber) {
                newValue = type === 'sd' ? element.get('shortnumber') : element.get('cardnumber');
              }
            });
          }
          this.props.stateUpdateCardNumberTypeProperty(skierIndex, key, 'number', newValue);
        }
      });

      // Delete errors
      this.props.deleteKeyFieldsErrors(currentId, errorKey);

      const cardType = tabKeycardType[type];

      // Save cardNumber value
      this.props.stateUpdateCardNumberTypeProperty(skierIndex, type, 'number', cardnumber);

      // verification keycard number is correct
      if (cardnumber !== '' || cardnumber !== undefined) {
        validKeycard = MaskHelper.verifyKeycard(cardnumber, cardType);

        this.props.stateUpdateCardNumberTypeProperty(skierIndex, type, 'formatValid', validKeycard);
        this.changeValidationCard(validKeycard);

        this.props.checkValidKeycard(skierIndex);

        // Keycard mask is valid
        if (!validKeycard) {
          this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
        }
      } else {
        this.props.updateFieldsErrors(currentId, errorKey, errorLabel);
      }
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
   * Render keycard types content (choice or not)
   *
   * @param keycardTypes
   * @returns {XML}
   */
  renderedKeyCardTypesContent(keycardTypes) {
    return (keycardTypes.size > 1
      ? ( // Display Double Mask KeyCard
        <div>
          <ul className="nav nav-tabs nav-justified responsive-tabs" role="tablist">
            { keycardTypes.keySeq().toJS().map(type => this.renderedLabelTab(type)) }
          </ul>
          <div className="tab-content">
            {
              keycardTypes.keySeq().toJS().map(type => (
                this.renderedSomeInputKeyCards(type)
              ))
            }
          </div>
        </div>
      ) : (
        // Display one Input for keyCard : get the first cardNumber type (first key of map)
        this.renderedInputOneKeyCard(keycardTypes.keySeq().first())
      )
    );
  }

  /**
   * Display of the simple input mask
   *
   * @param type
   * @returns {*}
   */
  renderedInputOneKeyCard(type) {
    const errorKey = 'data.cardNumber';
    const currentId = this.props.localItemInfo.get('skierIndex');
    let cardNumber = getCurrentCardNumberValue(this.props.localItemInfo);

    if (cardNumber === null || typeof cardNumber === 'undefined') {
      cardNumber = '';
    }

    // Change current cardNumber type
    this.props.updateCurrentCardNumberType(currentId, type);

    return (
      <div key={type}>
        { this.renderedCardNumberField(type, cardNumber) }
        { this.state.checkYes ? this.renderedLabelLinkPopover() : '' }
        {
          cardNumber === '' || !isCurrentCardNumberValid(this.props.localItemInfo)
            ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo)
            : '' }
      </div>
    );
  }

  /**
   * Display labels for inputs - select active input
   * @returns {XML}
   * @param textType
   * @param type
   */
  renderedLabelTab(type) {
    let className = 'nav-item';
    const { formatMessage } = this.props.intl;
    const labelKeycard = `rp.checkout.keycard.label.${type}`;

    if (isCurrentCardNumberType(this.props.localItemInfo, type)) {
      className = `${className} active`;
    }

    return (
      <li className={className} key={type}>
        <a
          className="nav-link text-center"
          data-toggle="tab"
          role="tab"
          href={`type${type}`}
          onClick={() => {
            // Change current cardNumber type
            this.props.updateCurrentCardNumberType(this.props.localItemInfo.get('skierIndex'), type);
          }}
        >
          {formatMessage({ id: labelKeycard, defaultMessage: 'Keycard' })}
        </a>
      </li>
    );
  }

  /**
   * Display of the double input mask
   *
   * @param type
   * @returns {XML}
   */
  renderedSomeInputKeyCards(type) {
    let className = 'tab-pane fade in';
    const aux = `tabKeycardType[type]${type}`;
    const errorKey = 'data.cardNumber';
    let cardNumber = getCurrentCardNumberValue(this.props.localItemInfo);

    if (cardNumber === null || typeof cardNumber === 'undefined') {
      cardNumber = '';
    }

    // Remove spaces on card number
    cardNumber = cardNumber.replace(new RegExp(/( )|(_)/g), '');

    const isCurrentType = isCurrentCardNumberType(this.props.localItemInfo, type);

    // active tab on select
    if (isCurrentType) {
      className = `${className} active`;
    }

    return (
      <div className={className} id={aux} role="tabpanel" key={type}>
        { this.renderedCardNumberField(type, cardNumber) }
        { this.state.checkYes ? this.renderedLabelLinkPopover() : '' }
        {
          cardNumber === '' || !isCurrentCardNumberValid(this.props.localItemInfo)
            ? KeyCard.renderedErrorInputMessage(errorKey, this.props.localItemInfo)
            : ''
        }
        {
          isCurrentCardNumberType(this.props.localItemInfo, 'swisspass')
            ? this.renderedContentForSwisspass()
            : null
        }
      </div>
    );
  }

  /**
   * Render a cardNumber field
   *
   * @param type
   * @param cardNumber
   */
  renderedCardNumberField(type, cardNumber) {
    return (
      <CardNumberField
        key={type}
        id={type}
        validInput={this.state.valid}
        mode={tabKeycardType[type]}
        keycards={this.props.keycards}
        handleChangeCardNumber={(event) => {
          this.handleChangeCardNumber(event, type);
        }}
        onChange={(event) => {
          this.handleChangeCardNumber(event, type);
        }}
        onAutoSuggestSelected={(number) => {
          this.handleChangeAutoSuggestCardNumber(number, type);
        }}
        cardNumber={cardNumber}
        value={cardNumber}
        params={this.props.params}
      />
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
    const zipcodeValue = getCardNumberTypeElementProperty(this.props.localItemInfo, 'swisspass', 'zipcode');
    const mask = { ...configs['ZIPCODE']};
    const { formatMessage } = this.props.intl;
    const skierIndex = this.props.localItemInfo.get('skierIndex');

    return (<div className="contentSwisspass">
      <div className="wrapperForm">
        <MaskedInput
          {...mask}
          name="zipcode-swiss"
          id="zipcode-swiss"
          data-control="true"
          onChange={event => this.handleChangeZipcode(event)}
          value={typeof zipcodeValue !== 'undefined' ? zipcodeValue : ''}
        />
        <label htmlFor="zipcode-swiss" className="control-label">
          <FormattedMessage id="rp.checkout.shippingaddress.zipcode" defaultMessage="Zipcode" />
        </label>
      </div>
      {
        !isSwissPassPropertyValid(this.props.localItemInfo, 'zipcodeFormatValid')
          ? KeyCard.renderedErrorInputMessage('data.swisspass.zipcode', this.props.localItemInfo)
          : ''
      }
      <input
        type="checkbox"
        checked={getCardNumberTypeElementProperty(this.props.localItemInfo, 'swisspass', 'checked')}
        name={`check-swisspass${skierIndex}`}
        id={`check-swisspass${skierIndex}`}
        // onChange={() => this.handleChangeCheckSwisspass()}
        onClick={() => this.handleChangeCheckSwisspass()}
      />
      <label htmlFor={`check-swisspass${skierIndex}`} onChange={() => this.handleChangeCheckSwisspass(skierIndex)}>
        <FormattedMessage id="rp.checkout.keycard.swisspass.check.text" defaultMessage="I agree with the conditions of SwissPass" />
      </label>
      <div dangerouslySetInnerHTML={{__html: formatMessage({ id:'rp.checkout.keycard.swisspass.link', defaultMessage: 'Disclaimer' })}} />
    </div>
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
                {fields.get('cardNumber').get('hasSupport', false) === true ?
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
                    { this.renderedKeyCardTypesContent(keycardTypes) }
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
  onChangeCheck: PropTypes.func.isRequired, // function to make changes when checking
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  updateCurrentCardNumberType: PropTypes.func.isRequired, // function to update current cardNumber type
  updateValidField: PropTypes.func.isRequired, //
  hasSupport: PropTypes.bool.isRequired, // boolean to know if support exists
  intl: intlShape.isRequired, // for the internationalization
  stateUpdateCardNumberTypeProperty: PropTypes.func.isRequired, // function to update cardNumber property value
  checkValidKeycard: PropTypes.func.isRequired, // function to check complete cardCardNumber valid
};

export default injectIntl(KeyCard);
