Template.runnerArea.helpers({
  actions() {
    return ActionFactory.runnerActions(Template.instance().data)
  },

  active (turnOwner) {
    return turnOwner == "runner" ? "runner-area--active" : ""
  }
})

Template.runnerArea.events({
  "click .js-modal-btn": function() {
    Modals.show()
  }
})
