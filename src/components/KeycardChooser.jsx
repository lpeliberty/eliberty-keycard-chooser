import React from 'react';
import PropTypes from 'prop-types';
import KeyCardArea from './KeyCardArea/KeyCardArea';

const KeycardChooser = (props) => (
  <div>
    <h1>{props.name}</h1>
    <KeyCardArea
      keycardTypes={props.keycardTypes}
      cardNumberList={props.cardNumberList}
      keycards={props.keycards}
      params={props.params}
    />
  </div>
);

KeycardChooser.propTypes = {
  orderitem: PropTypes.object.isRequired,
  keycardTypes: PropTypes.object.isRequired,
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default KeycardChooser;
