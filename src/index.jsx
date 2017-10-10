import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import store from './redux/stores/store';
import KeycardChooser from './components/KeycardChooser';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

addLocaleData([...en, ...fr]);

render(
  <Provider store={store}>
    <IntlProvider>
      <KeycardChooser name="React Lib keycard-chooser" />
    </IntlProvider>
  </Provider>, document.getElementById('root'));
