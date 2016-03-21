Actions.global = function(player) {
  let A = Actions.common

  return [
    {
      label: "Ready",
      requirement: function() {
        return !Actions.common.isReady(this[player])
      },
      perform() {
        Actions.common.ready(this[player])
        Actions.common.shuffleDeck(this[player])
        Actions.common.drawCard(this[player], 5)
        Actions.common._updatePlayer(this[player])
        Actions.common.shiftTurn(this.game)
        Actions.common._updateGame(this.game)
      }
    },

    {
      label: "Mulligan",
      requirement: function() {
        return Actions.common.isReady(this[player]) &&
               !Actions.common.didMulligan(this[player])
      },
      perform() {
        Actions.common.acceptMulligan(this[player], true)
        Actions.common.returnToDeck(this[player], this[player].hand)
        Actions.common.shuffleDeck(this[player])
        Actions.common.drawCard(this[player], 5)
        Actions.common._updatePlayer(this[player])
        Actions.common.shiftTurn(this.game)
        Actions.common._updateGame(this.game)
      }
    },

    {
      label: "Accept",
      requirement: function() {
        return Actions.common.isReady(this[player]) &&
               !Actions.common.didMulligan(this[player])
      },
      perform() {
        Actions.common.acceptMulligan(this[player], false)
        Actions.common._updatePlayer(this[player])
        Actions.common.shiftTurn(this.game)
        Actions.common._updateGame(this.game)
      }
    },

    {
      label: "End Turn",
      requirement: function() {
        return !Actions.common.hasClicks(this[player]) &&
               Actions.common.isTurnOwner(this[player])
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
