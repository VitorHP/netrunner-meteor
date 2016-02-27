Actions.global = function(player) {
  return [
    {
      label: "End Turn",
      requirementParams: [player],
      requirement: function(player) {
        return !Actions.common.hasClicks(player)
      },
      performParams: ['game'],
      perform(game) {
        Actions.common.shiftTurn(game)
        Actions.common._updateGame(game)
      }
    },

    {
      label: "Draw card",
      requirementParams: [player],
      requirement: function(player) {
        return Actions.common.hasClicks(player)
      },
      performParams: [player],
      perform(player) {
        Actions.common.drawCard(player)
        Actions.common.click(player, 1)
        Actions.common._updatePlayer(player)
      }
    },

    {
      label: "Receive 1 Credit",
      requirementParams: [player],
      requirement: function(player) {
        return Actions.common.hasClicks(player)
      },
      performParams: [player],
      perform(player) {
        Actions.common.receiveCredits(1)
        Actions.common.click(player, 1)
        Actions.common._updatePlayer(player)
      }
    },

    {
      label: "Install a card",
      perform() {

      }
    },

    {
      label: "Trigger ability",
      perform() {

      }
    }
  ] 
}
