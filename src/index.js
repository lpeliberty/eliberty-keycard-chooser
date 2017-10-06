import React from 'react';
import { render } from 'react-dom';
import KeycardChooser from './components/KeycardChooser';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

render(<KeycardChooser name='React Lib keycard-chooser' />, document.getElementById('root'));
