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
        keycards={props.keycards}
        params={props.params}
        orderitem={props.orderitem}
        changeCardNumber={props.changeCardNumber}
        onChangeCheck={props.onChangeCheck}
        itemFieldsDefinition={props.itemFieldsDefinition}
        popover={props.popover}
        hasSupport={props.hasSupport}
        localItemInfo={props.localItemInfo}
      />
    </div>
  );
}

KeycardChooser.propTypes = {
  keycardTypes: PropTypes.object.isRequired,
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  orderitem: PropTypes.object.isRequired,
  itemFieldsDefinition: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  popover: PropTypes.object.isRequired,
  hasSupport: PropTypes.bool.isRequired,
  localItemInfo: PropTypes.object.isRequired,
};

export default KeycardChooser;
