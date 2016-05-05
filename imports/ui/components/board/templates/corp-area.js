import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';

import './corp-area.html';

import './action-list.js';
import './card.js';
import './deck.js';
import './hand.js';
import './score.js';

Template.corpArea.helpers({
  actions() {
    return ActionFactory.actions('corp', Template.instance().data);
  },

  active(turnOwner) {
    return turnOwner === 'corp' ? 'corp-area--active' : '';
  },
});
