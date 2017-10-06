import React from 'react';
import PropTypes from 'prop-types';
import KeyCardArea from './KeyCardArea/KeyCardArea';

const KeycardChooser = ({ name }) => (
    <div>
      <h1>{name}</h1>
      <KeyCardArea />
    </div>
  )

KeycardChooser.propTypes = {
  name: PropTypes.string,
};

export default KeycardChooser;
