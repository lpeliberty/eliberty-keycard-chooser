import React from 'react';
import PropTypes from 'prop-types';
import KeyCard from './KeyCard/KeyCard';
// import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

/**
 * Keycard Chooser
 */
const KeycardChooser = props => (
  <div key={`${props.localItemInfo.get('index')}`}>
    <KeyCard
      // key={props.localItemInfo.get('index')}
      id={`${props.localItemInfo.get('index')}`}
      keycardPictureSrc={props.keycardPictureSrc}
      keycardTypes={props.keycardTypes}
      keycards={props.keycards}
      params={props.params}
      orderitem={props.orderitem}
      onChangeCheck={props.onChangeCheck}
      fields={props.fields}
      popover={props.popover}
      popoverLink={props.popoverLink}
      hasSupport={props.hasSupport}
      localItemInfo={props.localItemInfo}
      updateFieldsErrors={props.updateFieldsErrors}
      deleteKeyFieldsErrors={props.deleteKeyFieldsErrors}
      updateCurrentCardNumberType={props.updateCurrentCardNumberType}
      validateKeycard={props.validateKeycard}
      updateValidField={props.updateValidField}
      stateUpdateCardNumberTypeProperty={props.stateUpdateCardNumberTypeProperty}
    />
  </div>
);

KeycardChooser.propTypes = {
  keycardPictureSrc: PropTypes.string.isRequired, // keycard picture src
  keycardTypes: PropTypes.object.isRequired, // keycards to display the tabs
  keycards: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired, // generic params
  orderitem: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired, // Fields mapping
  popover: PropTypes.object.isRequired, // content for popover info keycard
  popoverLink: PropTypes.object.isRequired, // content for popover link keycard
  localItemInfo: PropTypes.object.isRequired, // current localItem
  onChangeCheck: PropTypes.func.isRequired, // function to make changes when checking
  updateFieldsErrors: PropTypes.func.isRequired, // function to update fields errors
  deleteKeyFieldsErrors: PropTypes.func.isRequired, // function to delete key on fields errors
  updateCurrentCardNumberType: PropTypes.func.isRequired, // function to update current cardNumber type
  // validateKeycard: function call api for verification of keycard number
  validateKeycard: PropTypes.func.isRequired,
  updateValidField: PropTypes.func.isRequired, //
  hasSupport: PropTypes.bool.isRequired, // boolean indicating support element
  stateUpdateCardNumberTypeProperty: PropTypes.func.isRequired, // function to update cardNumber property value
};

export default KeycardChooser;
