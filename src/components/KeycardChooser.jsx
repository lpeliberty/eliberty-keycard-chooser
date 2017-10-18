import React from 'react';
import PropTypes from 'prop-types';
import KeyCardArea from './KeyCardArea/KeyCardArea';
// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

const KeycardChooser = (props) => {
  return (
    <div>
        <h1>{props.name}</h1>
        <KeyCardArea
          keycardTypes={props.keycardTypes}
          cardNumberList={props.cardNumberList}
          keycards={props.keycards}
          params={props.params}
          orderitem={props.orderitem}
          changeCardNumber={props.changeCardNumber}
        />
    </div>
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
