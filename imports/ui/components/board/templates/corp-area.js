import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';

import './corp-area.html';

import './card.js';
import './deck.js';
import './action-list.js';
import './hand.js';
import './score.js';

import '../../../../api/lib/action-factory.js';

Template.corpArea.helpers({
  actions() {
    return ActionFactory.corpActions(Template.instance().data);
  },

  active(turnOwner) {
    return turnOwner === 'corp' ? 'corp-area--active' : '';
  },

});
