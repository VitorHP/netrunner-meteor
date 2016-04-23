import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';
import { Modals } from '../../modals/modals.js';

import './runner-area.html';
import './score.js';

Template.runnerArea.helpers({
  actions() {
    return ActionFactory.runnerActions(Template.instance().data);
  },

  active(turnOwner) {
    return turnOwner === 'runner' ? 'runner-area--active' : '';
  },
});

Template.runnerArea.events({
  'click .js-modal-btn': function clickModalBtn() {
    Modals.show();
  },
});
