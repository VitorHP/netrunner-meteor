const instance = Template.instance()
const actions  = Modules.actions

Template.runnerArea.helpers({
  actions() {
    return [
      {
        label: "Draw cards",
        perform() {
          let runner = instance.data.runner

          actions.common.drawCard(runner)
          actions.common.click(runner, 1)
          actions.common._updateRunner(runner)
        }
      }
    ]
  },

  active (turnOwner) {
    return turnOwner == "runner" ? "runner-area--active" : ""
  },

  placeholder () {
    return { imgSrc: "images/cards/runner-background.png" }
  }
})
