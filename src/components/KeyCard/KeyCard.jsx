import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PopoverQuestion from '../PopoverQuestion/PopoverQuestion';
import PopoverLink from '../PopoverLink/PopoverLink';
import OneMask from '../OneMask/OneMask';
import DoubleMask from '../DoubleMask/DoubleMask';
// import './keyCard.scss';

/**
 * Keycard
 */
class KeyCard extends React.Component {
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
   * @param keycardTypes
   * @param keycards
   * @param params
   * @returns {XML}
   */
  renderedListKeyCard(keycardTypes) {
    return (keycardTypes.size > 1
        ? (
          <DoubleMask
            keycards={this.props.keycards}
            keycardTypes={keycardTypes}
            params={this.props.params}
            localItemInfo={this.props.localItemInfo}
            updateKeycardsMask={this.props.updateKeycardsMask}
            deleteKeyFieldsErrors={this.props.deleteKeyFieldsErrors}
            updateFieldsErrors={this.props.updateFieldsErrors}
            orderitem={this.props.orderitem}
            changeCardNumber={this.props.changeCardNumber}
          />
        ) :
        keycardTypes.map((card, index) => (
          <OneMask
            card={card}
            index={index}
            keycards={this.props.keycards}
            params={this.props.params}
            localItemInfo={this.props.localItemInfo}
            updateKeycardsMask={this.props.updateKeycardsMask}
            deleteKeyFieldsErrors={this.props.deleteKeyFieldsErrors}
            updateFieldsErrors={this.props.updateFieldsErrors}
            orderitem={this.props.orderitem}
            changeCardNumber={this.props.changeCardNumber}
          />
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
  hasSupport: PropTypes.bool.isRequired, // boolean to know if support exists
  intl: intlShape.isRequired, // for the internationalization
};

export default injectIntl(KeyCard);
