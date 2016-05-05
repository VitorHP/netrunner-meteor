import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';

import './action-list.js';
import './hand.js';
import './runner-area.html';
import './score.js';

Template.runnerArea.helpers({
  actions() {
    return ActionFactory.actions('runner', Template.instance().data);
  },

  active(turnOwner) {
    return turnOwner === 'runner' ? 'runner-area--active' : '';
  },
});
