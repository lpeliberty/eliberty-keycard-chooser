import React from 'react';
import { PropTypes } from 'prop-types';
import { Map } from 'immutable';
import SVGInline from 'react-svg-inline';
import CardNumberField from '../CardNumberField/CardNumberField';
import questionSvg from '../images/questionImg';
// import './KeyCardArea.scss';

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
    };
    this.handleClickCheckYes = this.handleClickCheckYes.bind(this);
    this.handleClickCheckNo = this.handleClickCheckNo.bind(this);
    this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
    this.handleChangeAutoSuggestCardNumber = this.handleChangeAutoSuggestCardNumber.bind(this);
  }

  handleClickCheckYes() {
    this.setState({
      checkYes: true,
      checkNo: false,
    });
  }

  handleClickCheckNo() {
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

      if (cardnumber.substr(0, 1) !== '_') {
        cardNumberList = new Map();
      }

      cardNumberList = cardNumberList.set(cardId, cardnumber);
      this.setState({ cardNumberList });
      this.props.changeCardNumber(this.props.orderitem.get('id'), cardnumber);
    }
  }

  renderedContentCheckNo() {
    return (this.state.checkNo
        ?
        (
          <div className="msgCheckNo">
            <p>
              Vous ne disposez pas de carte pour ce skieur,
              elle vous sera livrée ou mise à disposition.
            </p>
          </div>
        )
        : ''
    );
  }

  renderedLabelTab(card) {
    const aux = `card${card.get('id')}`;
    let className = 'nav-item';

    if (card.get('id') === this.state.idCard) {
      className = `${className} active`;
    }

    return (
      <li className={className} key={card.get('id')}>
        <a
          className="nav-link text-center"
          data-toggle="tab"
          role="tab"
          href={aux}
          onClick={() => {
            this.setState({
              idCard: card.get('id'),
            });
          }}
        >{card.get('label')}</a>
      </li>
    );
  }

  renderedKeyCardsTypesSome(card, cardNumberList, keycards, params) {
    const aux = `card${card.get('id')}`;
    let className = 'tab-pane fade in';
    if (card.get('id') === this.state.idCard) {
      className = `${className} active`;
    }
    const cardNumber = cardNumberList.get(card.get('id'), '');
    return (
      <div className={className} id={aux} role="tabpanel" key={card.get('id')}>
        <CardNumberField
          id={card.get('id')}
          mode={card.get('type').toUpperCase()}
          keycards={keycards}
          handleChangeCardNumber={(event) => {
            this.handleChangeCardNumber(event, card.get('id'));
          }}
          onChange={(event) => {
            this.handleChangeCardNumber(event, card.get('id'));
          }}
          onAutoSuggestSelected={(cardnumber) => {
            this.handleChangeAutoSuggestCardNumber(cardnumber, card.get('id'));
          }}
          cardNumber={cardNumber.toUpperCase()}
          value={cardNumber}
          params={params}
        />
      </div>
    );
  }

  renderedKeyCardsTypesOne(card, cardNumberList, params) {
    const cardNumber = cardNumberList.get(card.get('id'), '');
    return (
      <CardNumberField
        id={card.get('id')}
        mode={card.get('type').toUpperCase()}
        handleChangeCardNumber={(event) => {
          this.handleChangeCardNumber(event, card.get('id'));
        }}
        onChange={(event) => {
          this.handleChangeCardNumber(event, card.get('id'));
        }}
        onAutoSuggestSelected={(cardnumber) => {
          this.handleChangeAutoSuggestCardNumber(cardnumber, card.get('id'));
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
                keycardTypes.map(card => (this.renderedLabelTab(card)))
              }
            </ul>
            <div className="tab-content">
              {
                keycardTypes.map(card => (
                  this.renderedKeyCardsTypesSome(card, cardNumberList, keycards, params)))
              }
            </div>
          </div>
        )
        :
        (
          keycardTypes.map(card => (
            this.renderedKeyCardsTypesOne(card, cardNumberList, params)))
        )
    );
  }

  renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params) {
    return (this.state.checkYes
        ? (
          <div className="msgCheckYes">
            { this.renderedListKeyCard(keycardTypes, cardNumberList, keycards, params) }
            <a href="#" className="infoKeyCard">
              <span>Où trouver mon numéro de carte ?</span>
            </a>
          </div>
        ) : ''
    );
  }

  render() {
    const { keycardTypes, keycards, params } = this.props;
    const { cardNumberList } = this.state;

    return (
      <div>
        <div>
        <p>J'ai une carte mains libres*</p>
        <button type="button" className="contentQuestion" data-toggle="modal" data-target="#myModal">
          <questionSvg />
        </button>
        <form>
          <div className="form-group keyCardAreaForm">
            <input type="radio" id="inputCheckOui" name="card" value="oui" onClick={() => { this.handleClickCheckYes(); }} />
            <label htmlFor="inputCheckOui" className="keycardChoice">oui</label>
            <input type="radio" id="inputCheckNo" name="card" value="non" onClick={() => { this.handleClickCheckNo(); }} />
            <label htmlFor="inputCheckNo" className="keycardChoice">non</label>
            { this.renderedContentCheckNo() }
            { this.renderedContentCheckYes(keycardTypes, cardNumberList, keycards, params) }
          </div>
        </form>
        </div>

      </div>
    );
  }
}

export default KeyCardArea;
