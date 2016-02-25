Template.runnerArea.helpers({
  actions() {
    const instance = Template.instance()
    const actions  = Modules.actions

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

})
