import { Template } from 'meteor/templating';

import './modal-choice.html';

Template.modalChoice.helpers({
  isFirst(item, collection) {
    return collection.indexOf(item) === 0;
  },
});
