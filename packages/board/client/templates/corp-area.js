var placeholderCard = { imgSrc: "images/cards/corp-background.png" }

Template.corpArea.helpers({
  actions() {
    const instance = Template.instance()
    const actions  = Modules.actions

    return [
      {
        label: "End Turn",
        perform() {
          let game = instance.data.game

          actions.common.shiftTurn(game)
          actions.common._updateGame(game)
        }
      },
      {
        label: "Receive 1 Credit",
        perform() {
          let corp = instance.data.corp

          actions.common.receiveCredits(1)
          actions.common.click(corp, 1)
          actions.common._updateCorp(corp)
        }
      },
      {
        label: "Draw corp cards",
        perform() {
          let corp = instance.data.corp

          actions.common.drawCard(corp)
          actions.common.click(corp, 1)
          actions.common._updateCorp(corp)
        }
      },
    ]
  },

  active (turnOwner) {
    return turnOwner == "corp" ? "corp-area--active" : ""
  },

  placeholder () {
    return placeholderCard
  },

  remoteServersPlaceholder () {
    return {
      ices: [placeholderCard],
      card: placeholderCard
    }
  }

})
