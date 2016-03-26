
Template.corpArea.helpers({
  actions() {
    return ActionFactory.corpActions(Template.instance().data)
  },

  active (turn_owner) {
    return turn_owner == "corp" ? "corp-area--active" : ""
  }

})
