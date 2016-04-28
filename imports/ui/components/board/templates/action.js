import { Template } from 'meteor/templating';

import './action.html';

Template.action.events({
  'click .js-action-btn'() {
    this.action.perform();
  },
});
