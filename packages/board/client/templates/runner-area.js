const instance = Template.instance()
const actions  = Actions

Template.runnerArea.helpers({
  actions() {
    return ActionFactory.runnerActions(Template.instance().data)
  },

  active (turnOwner) {
    return turnOwner == "runner" ? "runner-area--active" : ""
  },

  placeholder () {
    return { imgSrc: "images/cards/runner-background.png" }
  }
})
