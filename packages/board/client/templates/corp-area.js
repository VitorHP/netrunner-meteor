Template.corpArea.helpers({
  actions() {
    const instance = Template.instance()
    const actions  = Modules.actions

    return [
      {
        label: "Draw corp cards",
        perform() {
          let corp = instance.data.corp

          actions.common.drawCard(corp)
          actions.common.click(corp, 1)
          actions.common._updateCorp(corp)
        }
      }
    ]
  },

})
