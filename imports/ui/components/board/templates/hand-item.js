import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';

import './hand-item.html';

Template.handItem.helpers({
  actions() {
    return ActionFactory.handActions(Template.instance().data);
  },
});
