import './action.html'

Template.action.events({
  'click .js-action-btn'(event, instance) {
    this.action.perform()
  }
})
