Template.runnerArea.helpers({
  actions() {
    return ActionFactory.runnerActions(Template.instance().data)
  },

  active (turnOwner) {
    return turnOwner == "runner" ? "runner-area--active" : ""
  }
})
