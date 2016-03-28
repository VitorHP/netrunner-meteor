Actions.global = function(player) {
  let A = Actions.common

  return [
    {
      label: "Ready",
      requirement: function() {
        return !Actions.common.isReady(this[player])
      },
      perform() {
        R.pipe(
          A.ready,
          A.shuffleDeck,
          A.drawCard(5),
          A._updatePlayer
        )(this[player])

        R.pipe(
          A.shiftTurn,
          A._updateGame
        )(this.game)
      }
    },

    {
      label: "Mulligan",
      requirement: function() {
        return A.isReady(this[player]) &&
               !A.didMulligan(this[player])
      },
      perform() {
        R.pipe(
          A.acceptMulligan(true),
          A.returnToDeck(this[player].hand, 'hand'),
          A.shuffleDeck,
          A.drawCard(5),
          // A._updatePlayer,
        )(this[player])
          debugger

        R.pipe(
          A.shiftTurn,
          A._updateGame
        )(this.game)
      }
    },

    {
      label: "Accept",
      requirement: function() {
        return A.isReady(this[player]) &&
               !A.didMulligan(this[player])
      },
      perform() {
        R.pipe(
          A.acceptMulligan(false),
          A._updatePlayer
        )(this[player])

        R.pipe(
          A.shiftTurn,
          A._updateGame,
        )(this.game)
      }
    },

    {
      label: "End Turn",
      requirement: function() {
        return !A.hasClicks(this[player]) &&
               A.isTurnOwner(this[player])
      },
      perform() {
        R.pipe(
          A.shiftTurn,
          A._updateGame
        )(this.game)
      }
    },
    {
      label: "Draw card",
      requirement: function() {
        return A.hasClicks(this.player)
      },
      perform() {
        A.drawCard(this.player)
        A.click(this.player, 1)
        A._updatePlayer(this.player)
      }
    },

    {
      label: "Receive 1 Credit",
      requirement: function() {
        return A.hasClicks(this.player)
      },
      perform() {
        A.receiveCredits(1)
        A.click(this.player, 1)
        A._updatePlayer(this.player)
      }
    },
  ]
}
