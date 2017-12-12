import React from 'react';
import PropTypes from 'prop-types';
import KeyCardArea from './KeyCardArea/KeyCardArea';
import {updateFieldsErrors} from "../../../../app/redux/actions/actions";
// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

const KeycardChooser = (props) => (
  <div>
    <h1>{props.name}</h1>
    <KeyCardArea
      key={props.localItemInfo.get('index')}
      keycardTypes={props.keycardTypes}
      keycards={props.keycards}
      params={props.params}
      orderitem={props.orderitem}
      changeCardNumber={props.changeCardNumber}
      onChangeCheck={props.onChangeCheck}
      itemFieldsDefinition={props.itemFieldsDefinition}
      popover={props.popover}
      popoverLink={props.popoverLink}
      hasSupport={props.hasSupport}
      localItemInfo={props.localItemInfo}
      updateFieldsErrors={props.updateFieldsErrors}
      deleteKeyFieldsErrors={props.deleteKeyFieldsErrors}
      setTypeCard={props.setTypeCard}
    />
  </div>
);

KeycardChooser.propTypes = {
  keycardTypes: PropTypes.object.isRequired,
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  orderitem: PropTypes.object.isRequired,
  itemFieldsDefinition: PropTypes.object.isRequired,
  changeCardNumber: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  popover: PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: PropTypes.object.isRequired, // content for popover link keycard
  hasSupport: PropTypes.bool.isRequired,
  localItemInfo: PropTypes.object.isRequired,
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  setTypeCard: PropTypes.func.isRequired, // function to set type card on a item (orderitem)
};

export default KeycardChooser;
