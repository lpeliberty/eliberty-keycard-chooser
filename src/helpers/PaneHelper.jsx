import { Map, List } from 'immutable';

/**
 * Check if a pane is opened
 * @param orderitem
 * @param localItems
 * @returns {boolean}
 */
export function paneIsOpen(orderitem, localItems) {
  const orderitemId = orderitem.get('skierIndex');
  if (!localItems.has(orderitemId)) {
    return true;
  }
  const localItem = localItems.get(orderitemId);
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
export function getSkiersList(contact, params) {
  return contact
    .get('skiers')
    .map(skier => getSkierData(skier, params))
    .push(getSkierData(contact, params));
}

/**
 * Prepare skier data exposed
 * @param skier
 * @returns {*}
 */
function getSkierData(skier, params) {
  const skierMap = new Map({
    id: skier.get('id'),
    lastname: skier.get('lastname'),
    firstname: skier.get('firstname'),
    birthdate: skier.get('birthdate'),
    pictureurl: skier.get('pictureurl', ''),
  });

  if (!skier.has('lastkeycard')
    || !skier.get('lastkeycard').has('keycardNumber')
    || params.get('displayLastUsedKeycard') === false) {
    return skierMap;
  }

  return skierMap.set('keycard', skier.get('lastkeycard').get('keycardNumber'));
}

/**
 * Get keycards list
 *
 * @param contact
 */
export function getKeycardsList(contact) {
  // Prepare smart contact list
  const contactKeycardsList = contact
    .get('skiers')
    .map(skier => (prepareContactKeycards(skier))) // add skiers data
    .push(prepareContactKeycards(contact)); // add main contact data

  let finalKeycards = new List();
  contactKeycardsList.forEach((contactKeycard) => {
    const loopContact = contactKeycard.get('contact');
    contactKeycard.get('keycardnumbers', new List()).forEach((keycardnumber) => {
      const cardNumber = keycardnumber.get('cardNumber');

      const index = finalKeycards.findIndex((value) => {
        return value.get('cardnumber') === cardNumber;
      });

      if (index >= 0) {
        finalKeycards = finalKeycards.update(index, value => (
          value.set('contacts', value.get('contacts').push(loopContact))
        ));
      } else {
        finalKeycards = finalKeycards.push(new Map({
          cardnumber: cardNumber,
          contacts: new List().push(loopContact),
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
  return new Map({
    contact: {
      id: contact.get('id'),
      lastname: contact.get('lastname'),
      firstname: contact.get('firstname'),
      birthdate: contact.get('birthdate'),
    },
    keycardnumbers: contact.get('keycardnumbers', new List()),
  });
}

