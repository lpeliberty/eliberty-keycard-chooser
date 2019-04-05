import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Autosuggest from 'react-autosuggest';
import * as AutoSuggestionHelper from '../../helpers/AutoSuggest/MaskedInputAutoSuggestHelper';
import * as tabKeycardType from '../../constants/keycardsType';

const configs = {
  SKIDATA: {
    placeholder: '00-0000 0000 0000 0000 0000-0',
    mask: [
      /[0-3]/, /\d/, '-',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, '-', /\d/,
    ],
    pipe: (value => (value[0] === '1' ? { value: `01${value.slice(2)}`, indexesOfPipedChars: [0] } : value)),
  },
  TEAMAXESS: {
    placeholder: 'XXXXXXXX-XXX-XXX',
    mask: [
      /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,
      /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[Aa-zA-Z0-9]/, '-',
      /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, '-',
      /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,
    ],
  },
  ALFI: {
    placeholder: '_____-_____-____',
    mask: [
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ],
  },
  'GO-SKI': {
    placeholder: '000000000-0',
    mask: [
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',
      /[0-9]/,
    ],
  },
  SWISSPASS: {
    placeholder: 'S00-000-000-000',
    mask: [
      /[S|s]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-',
      /[0-9]/, /[0-9]/, /[0-9]/,
    ],
  },
  VERBIER: {
    placeholder: 'A000000',
    mask: [
      /[A|B]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ],
  },
};

/**
 * Card Number Field
 */
class CardNumberField extends React.Component {
  constructor(props) {
    super(props);

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

    this.state = {
      suggestions: [],
    };
  }

  /**
   *
   * @param value
   */
  onSuggestionsFetchRequested({ value }) {
    const cardType = 'open';
    const listKeycards = AutoSuggestionHelper.getSuggestions(
      value,
      this.props.keycards.toJS(),
      this.props.params,
      this.props.mode === tabKeycardType[cardType], // Define if we are on shortnumber using mode
    );
    // Add element type card for display suggestions
    listKeycards.forEach((keycard) => {
      keycard.mode = this.props.mode;
    });

    this.setState({
      suggestions: listKeycards,
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  /**
   *
   * @param event
   * @param suggestion
   */
  onSuggestionSelected(event, { suggestion }) {
    const cardType = 'open';
    const cardnumber = suggestion.mode === tabKeycardType[cardType]
      ? suggestion.shortnumber
      : suggestion.cardnumber;
    this.props.onAutoSuggestSelected(cardnumber);
  }

  /**
   *
   * @param mode
   * @param params
   * @param suggestions
   * @param inputProps
   * @returns {XML}
   */
  renderedCardNumberField(mode, params, suggestions, inputProps) {
    return (mode !== 'OPEN' && params.get('displayKeycardAutoComplete', false) === true
      ? (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          shouldRenderSuggestions={() => true}
          getSuggestionValue={AutoSuggestionHelper.getSuggestionValue}
          renderSuggestion={AutoSuggestionHelper.renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={AutoSuggestionHelper.renderInputComponent}
          focusInputOnSuggestionClick={false}
        />)
      : <MaskedInput {...inputProps} />
    );
  }

  render() {
    const { suggestions } = this.state;
    const { mode, handleChangeCardNumber, cardNumber, params, validInput } = this.props;

    console.log('CardNumberField::mode -> ', mode);

    const inputProps = {
      ...configs[mode],
      id: cardNumber,
      className: validInput === true ? 'form-control text-left' : 'form-control text-left inputError',
      onChange: handleChangeCardNumber,
      value: cardNumber,
    };

    return (
      <div>
        { this.renderedCardNumberField(mode, params, suggestions, inputProps) }
      </div>
    );
  }
}

CardNumberField.propTypes = {
  mode: PropTypes.string.isRequired,
  handleChangeCardNumber: PropTypes.func.isRequired,
  onAutoSuggestSelected: PropTypes.func.isRequired,
  cardNumber: PropTypes.string.isRequired,
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  validInput: PropTypes.bool.isRequired,
};

export default CardNumberField;
