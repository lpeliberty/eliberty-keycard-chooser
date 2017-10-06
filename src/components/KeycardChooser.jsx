import React from 'react';
import PropTypes from 'prop-types';
import KeyCardArea from './KeyCardArea/KeyCardArea';

const KeycardChooser = (props) => (
  <div>
    <h1>{props.name}</h1>
    <KeyCardArea />
  </div>
);

KeycardChooser.propTypes = {
  name: PropTypes.string,
};

export default KeycardChooser;