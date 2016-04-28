import { Template } from 'meteor/templating';

import './action-list.html';

import './action.js';
import './action-dropdown.js';

Template.actionList.helpers({
  myTemplate() {
    return 'action';
  },
});
