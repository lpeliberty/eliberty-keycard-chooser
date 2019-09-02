import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl/dist/react-intl';
import messages from './translations/message.fr';
import store from './redux/stores/store';
import KeycardChooser from './components/KeycardChooser';

render(
  <Provider store={store}>
    <IntlProvider locale={store.getState().get('locale')} messages={messages}>
      <KeycardChooser />
    </IntlProvider>
  </Provider>, document.getElementById('root'));
