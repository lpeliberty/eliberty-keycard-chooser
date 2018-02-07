'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paneIsOpen = paneIsOpen;
exports.getSkiersList = getSkiersList;
exports.getKeycardsList = getKeycardsList;

var _immutable = require('immutable');

/**
 * Check if a pane is opened
 * @param orderitem
 * @param localItems
 * @returns {boolean}
 */
function paneIsOpen(orderitem, localItems) {
  var orderitemId = orderitem.get('skierIndex');
  if (!localItems.has(orderitemId)) {
    return true;
  }
  var localItem = localItems.get(orderitemId);
  if (!localItem.has('open')) {
    return true;
  }
  return localItem.get('open');
}

/**
 * Build skiers list
 * @param contact
 * @returns {string}
 */
function getSkiersList(contact, params) {
  return contact.get('skiers').map(function (skier) {
    return getSkierData(skier, params);
  }).push(getSkierData(contact, params));
}

/**
 * Prepare skier data exposed
 * @param skier
 * @returns {*}
 */
function getSkierData(skier, params) {
  var skierMap = new _immutable.Map({
    id: skier.get('id'),
    lastname: skier.get('lastname'),
    firstname: skier.get('firstname'),
    birthdate: skier.get('birthdate'),
    pictureurl: skier.get('pictureurl', '')
  });

  if (!skier.has('lastkeycard') || !skier.get('lastkeycard').has('keycardNumber') || params.get('displayLastUsedKeycard') === false) {
    return skierMap;
  }

  return skierMap.set('keycard', skier.get('lastkeycard').get('keycardNumber'));
}

/**
 * Get keycards list
 *
 * @param contact
 */
function getKeycardsList(contact) {
  // Prepare smart contact list
  var contactKeycardsList = contact.get('skiers').map(function (skier) {
    return prepareContactKeycards(skier);
  }) // add skiers data
  .push(prepareContactKeycards(contact)); // add main contact data

  var finalKeycards = new _immutable.List();
  contactKeycardsList.forEach(function (contactKeycard) {
    var loopContact = contactKeycard.get('contact');
    contactKeycard.get('keycardnumbers', new _immutable.List()).forEach(function (keycardnumber) {
      var cardNumber = keycardnumber.get('cardNumber');

      var index = finalKeycards.findIndex(function (value) {
        return value.get('cardnumber') === cardNumber;
      });

      if (index >= 0) {
        finalKeycards = finalKeycards.update(index, function (value) {
          return value.set('contacts', value.get('contacts').push(loopContact));
        });
      } else {
        finalKeycards = finalKeycards.push(new _immutable.Map({
          cardnumber: cardNumber,
          contacts: new _immutable.List().push(loopContact)
        }));
      }
    });
  });

  return finalKeycards;
}

/**
 * Prepare keycard contact structure
 *
 * @param contact
 * @returns {Immutable.Map}
 */
function prepareContactKeycards(contact) {
  return new _immutable.Map({
    contact: {
      id: contact.get('id'),
      lastname: contact.get('lastname'),
      firstname: contact.get('firstname'),
      birthdate: contact.get('birthdate')
    },
    keycardnumbers: contact.get('keycardnumbers', new _immutable.List())
  });
}
//# sourceMappingURL=PaneHelper.js.map