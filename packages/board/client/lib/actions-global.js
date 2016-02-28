Actions.global = function(player) {
  return [
    {
      label: "End Turn",
      requirement: function() {
        return !Actions.common.hasClicks(this.player)
      },
      perform() {
        Actions.common.shiftTurn(this.game)
        Actions.common._updateGame(this.game)
      }
    },

    {
      label: "Draw card",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {
        Actions.common.drawCard(this.player)
        Actions.common.click(this.player, 1)
        Actions.common._updatePlayer(this.player)
      }
    },

    {
      label: "Receive 1 Credit",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {
        Actions.common.receiveCredits(1)
        Actions.common.click(this.player, 1)
        Actions.common._updatePlayer(this.player)
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
