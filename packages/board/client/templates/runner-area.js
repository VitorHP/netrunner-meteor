Template.runnerArea.helpers({
  actions() {
    const instance = Template.instance()
    const actions  = Modules.actions

    return [
      {
        label: "Draw cards",
        perform() {
          let runner = instance.data.runner
          actions.drawCard(runner)
        }
      }
    ]
  },

})
