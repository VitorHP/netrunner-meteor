import { $ } from 'meteor/jquery';
import { Template } from 'meteor/templating';

import './action-dropdown.html';

Template.actionDropdown.events({
  'click .js-action-dropdown-item'(e) {
    const property = this.input.property;
    const value = $(e.target).data('value');

    this.perform({
      [property]: value,
    });
  },
});
