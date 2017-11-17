import React from 'react';
import { PropTypes } from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import CardNumberField from '../CardNumberField/CardNumberField';
import * as tabKeycardType from '../../constants/keycardsType';
// import './keyCardArea.scss';

/**
 * Keycard area
 */
class KeyCardArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkYes: false,
      checkNo: false,
      idCard: 0,
      cardNumberList: new Map(),
      popoverOpen: false,
    };
    this.handleClickCheckYes = this.handleClickCheckYes.bind(this);
    this.handleClickCheckNo = this.handleClickCheckNo.bind(this);
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeAutoSuggestCardNumber = this.handleChangeAutoSuggestCardNumber.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleClickCheckYes() {
    this.props.onChangeCheck('yes');
    this.setState({
      checkYes: true,
      checkNo: false,
    });
  }

  handleClickCheckNo() {
    this.props.onChangeCheck('no');
    this.setState({
      checkYes: false,
      checkNo: true,
    });
  }

  handleChangeCardNumber(event, cardId) {
    this.handleChangeAutoSuggestCardNumber(event.target.value, cardId);
  }

  handleChangeAutoSuggestCardNumber(cardnumber, cardId) {
    if (typeof cardnumber !== 'undefined') {
      let cardNumberList = this.state.cardNumberList;

      /*if (cardnumber.substr(0, 1) !== '_') {
        cardNumberList = new Map();
      }*/

      cardNumberList = cardNumberList.set(cardId, cardnumber);
      this.setState({ cardNumberList });
      this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  renderedContentCheckNo() {
    return (this.state.checkNo
        ?
        (
          <div className="msgCheckNo">
            <p>
              <FormattedMessage id="rp.checkout.keycard.area.message.no.card" defaultMessage="no card" />
            </p>
          </div>
        )
        : ''
    );
  }

  renderedLabelTab(card,index) {
    const aux = `card${index}`;
    let className = 'nav-item';

    if (index === this.state.idCard) {
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
            this.setState({
              idCard: index,
            });
          }}
        >{card}</a>
      </li>
    );
  }

  renderedSomeInputKeyCards(card, index, cardNumberList, keycards, params) {
    const aux = `card${index}`;
    let className = 'tab-pane fade in';
    if (index === this.state.idCard) {
      className = `${className} active`;
    }
    const cardNumber = cardNumberList.get(index, '');
    return (
      <div className={className} id={aux} role="tabpanel" key={index}>
        <CardNumberField
          id={index}
          mode={card}
          keycards={keycards}
          handleChangeCardNumber={(event) => {
            this.handleChangeCardNumber(event, index);
          }}
          onChange={(event) => {
            this.handleChangeCardNumber(event, index);
          }}
          onAutoSuggestSelected={(cardnumber) => {
            this.handleChangeAutoSuggestCardNumber(cardnumber, index);
          }}
          cardNumber={cardNumber.toUpperCase()}
          value={cardNumber}
          params={params}
        />
      </div>
    );
  }

  renderedOneInputKeyCard(card, index, cardNumberList, keycards, params) {
    const cardNumber = cardNumberList.get(index, '');
    return (
      <CardNumberField
        id={index}
        mode={card}
        keycards={keycards}
        handleChangeCardNumber={(event) => {
          this.handleChangeCardNumber(event, index);
        }}
        onChange={(event) => {
          this.handleChangeCardNumber(event, index);
        }}
        onAutoSuggestSelected={(cardnumber) => {
          this.handleChangeAutoSuggestCardNumber(cardnumber, index);
        }}
        cardNumber={cardNumber.toUpperCase()}
        value={cardNumber}
        params={params}
      />
    );
  }

  renderedListKeyCard(keycardTypes, cardNumberList, keycards, params) {

    return (keycardTypes.size > 1
        ?
        (
          <div>
            <ul className="nav nav-tabs nav-justified responsive-tabs" role="tablist">
              {
                keycardTypes.map((card,index) => (this.renderedLabelTab(tabKeycardType[card],index)))
              }
            </ul>
            <div className="tab-content">
              {
                keycardTypes.map((card,index) => (
                  this.renderedSomeInputKeyCards(tabKeycardType[card], index, cardNumberList, keycards, params)))
              }
            </div>
          </div>
        )
        :
        (
          keycardTypes.map((card,index) => (
            this.renderedOneInputKeyCard(tabKeycardType[card], index, cardNumberList, keycards, params)))
        )
    );
  }

  renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params) {
    return (this.state.checkYes
        ? (
          <div className="msgCheckYes">
            { this.renderedListKeyCard(keycardTypes, cardNumberList, keycards, params) }
            <a href="#" className="infoKeyCard">
              <span><FormattedMessage id="rp.checkout.keycard.area.link.number.card" defaultMessage="number card" /></span>
            </a>
          </div>
        ) : ''
    );
  }

  questionImageSvg() {
    return (
      <svg x="0px"
           y="0px"
           width="15px"
           height="15px"
           viewBox="0 0 612 612"
           fill="#B8B8B8"
      >
        <g>
          <g>
            <path d="M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z"/>
            <path d="M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512
              c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865
              c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102
              c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585
              c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275
              c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259
              C315.875,186.187,329.033,191.083,336.962,200.875z"/>
            <path d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306
              C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306
              S459.64,584.182,306,584.182S27.818,459.64,27.818,306z"/>
            <rect x="274.51" y="415.214" width="40.559" height="42.367"/>
          </g>
        </g>
      </svg>
    );
  }

  render() {
    const { keycardTypes, keycards, params, itemFieldsDefinition, popover } = this.props;
    const { cardNumberList } = this.state;

    return (
      <div>
        <div>
          <p><FormattedMessage id="rp.checkout.keycard.area.question" defaultMessage="I have a card" /></p>
          <div className="contentPopover">
            <Button type="button" id="Popover1" className="contentQuestion" onClick={this.toggle}>
              {this.questionImageSvg()}
            </Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader className="popover-title">
                {popover.get('title')}
              </PopoverHeader>
              <PopoverBody className="popover-content">
                <div className="row">
                  <div className="col-xs-4">
                    <img className="img-responsive" src={popover.get('image')} alt="keycardinfo" />
                  </div>
                  <div className="col-xs-8">
                    {popover.get('content')}
                  </div>
                </div>
              </PopoverBody>
            </Popover>
          </div>
          <form>
            <div className="form-group keyCardAreaForm">
              {itemFieldsDefinition.get('keycard').get('forceReloading') === false ?
                (
                  <div>
                    <input type="radio" id="inputCheckOui" name="card" value="oui" onChange={() => { this.handleClickCheckYes(); }} />
                    <label htmlFor="inputCheckOui" className="keycardChoice"><FormattedMessage id="rp.checkout.keycard.area.reponse.yes" defaultMessage="yes" /></label>
                    <input type="radio" id="inputCheckNo" name="card" value="non" onChange={() => {  this.handleClickCheckNo(); }} />
                    <label htmlFor="inputCheckNo" className="keycardChoice"><FormattedMessage id="rp.checkout.keycard.area.reponse.no" defaultMessage="no" /></label>
                  </div>
                )
                : (
                  <div className="msgCheckYes">
                    { this.renderedListKeyCard(keycardTypes, cardNumberList, keycards, params) }
                    <a href="#" className="infoKeyCard">
                      <span><FormattedMessage id="rp.checkout.keycard.area.link.number.card" defaultMessage="number card" /></span>
                    </a>
                  </div>
                )
              }

              { this.renderedContentCheckNo() }
              { this.renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params) }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

KeyCardArea.propTypes = {
  keycardTypes: PropTypes.object.isRequired, // keycards to display the tabs
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired, // generic params
  orderitem: PropTypes.object.isRequired,
  itemFieldsDefinition: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired, // function to change cardnumber of item
  intl: intlShape.isRequired, // for the internationalization
  onChangeCheck: PropTypes.func.isRequired,
  popover: PropTypes.object.isRequired,
};

export default injectIntl(KeyCardArea);
