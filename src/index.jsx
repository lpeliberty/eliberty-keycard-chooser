import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import store from './redux/stores/store';
import KeycardChooser from './components/KeycardChooser';

addLocaleData([...en, ...fr]);

export const KeycardChooserRoot = props => (
  <Provider store={store}>
    <IntlProvider>
      <KeycardChooser {...props} />
    </IntlProvider>
  </Provider>
);

export default KeycardChooserRoot;
