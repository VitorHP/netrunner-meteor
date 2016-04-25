import { Template } from 'meteor/templating';

import './modal.html';

import './modal-choice.js';
import './modal-reveal.js';

Template.modal.helpers({
  templateName() {
    return Template.instance().data.templateName;
  },
});
