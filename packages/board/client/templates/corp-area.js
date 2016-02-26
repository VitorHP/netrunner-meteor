
Template.corpArea.helpers({
  actions() {
    return ActionFactory.corpActions(Template.instance().data)
  },

  active (turnOwner) {
    return turnOwner == "corp" ? "corp-area--active" : ""
  }

})
