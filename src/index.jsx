import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import store from './redux/stores/store';
import KeycardChooser from './components/KeycardChooser';

addLocaleData([...en, ...fr]);

render(
  <Provider store={store}>
    <IntlProvider>
      <KeycardChooser />
    </IntlProvider>
  </Provider>, document.getElementById('root'));
