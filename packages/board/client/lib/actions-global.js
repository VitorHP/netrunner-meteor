Actions.global = function(player) {
  return [
    {
      label: "Ready",
      requirement: function() {
        return !Actions.common.hasClicks(this[player])
      },
      perform() {
        Actions.common.shuffleDeck(this[player])
        Actions.common.drawCard(this[player], 5)
        Actions.common._updatePlayer(this[player])
      }
    },
    {
      label: "Mulligan",
      requirement: function() {
        return !Actions.common.hasClicks(this[player])
      },
      perform() {
        _.clone(this[player].hand).forEach((cardCode) => {
          Actions.common.trashCard(this[player], this[player].hand, cardCode)
        })

        Actions.common.drawCard(this[player], 5)

        console.log(this[player].hand)

        Actions.common._updatePlayer(this[player])
      }
    },
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
  ]
}
