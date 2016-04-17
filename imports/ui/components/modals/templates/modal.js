import { Template } from 'meteor/templating';

Template.modal.helpers({
  templateName() {
    return Template.instance().data.templateName;
  },
});
