Template.runnerArea.helpers({
  actions() {
    return ActionFactory.runnerActions(Template.instance().data)
  },

  active (turn_owner) {
    return turn_owner == "runner" ? "runner-area--active" : ""
  }
})

Template.runnerArea.events({
  "click .js-modal-btn": function() {
    Modals.show()
  }
})
