import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import store from '../redux/stores/store';
import KeyCardArea from './KeyCardArea/KeyCardArea';

addLocaleData([...en, ...fr]);

const KeycardChooser = (props) => {
  return (
    <Provider store={store}>
      <IntlProvider>
        <h1>{props.name}</h1>
        <KeyCardArea
          keycardTypes={props.keycardTypes}
          cardNumberList={props.cardNumberList}
          keycards={props.keycards}
          params={props.params}
          orderitem={props.orderitem}
          changeCardNumber={props.changeCardNumber}
        />
      </IntlProvider>
    </Provider>
  );
}

KeycardChooser.propTypes = {
  keycardTypes: PropTypes.object.isRequired,
  cardNumberList: PropTypes.object.isRequired,
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  orderitem: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired,
};

export default KeycardChooser;
