import R from 'ramda'

import { Mutations } from '../mutations.js'

export function playerContext(player) {

  return [
    {
      label: "Ready",
      requirement: function() {
        return !Mutations.isReady(this[player])
      },
      perform() {
        R.pipe(
          Mutations.ready,
          Mutations.shuffleDeck,
          Mutations.drawCard(5),
          Mutations._updatePlayer
        )(this[player])

        R.pipe(
          Mutations.shiftTurn,
          Mutations._updateGame
        )(this.game)
      }
    },

    {
      label: "Mulligan",
      requirement: function() {
        return Mutations.isReady(this[player]) &&
               !Mutations.didMulligan(this[player])
      },
      perform() {
        R.pipe(
          Mutations.acceptMulligan(true),
          Mutations.returnToDeck(this[player].hand, 'hand'),
          Mutations.shuffleDeck,
          Mutations.drawCard(5),
          Mutations._updatePlayer,
        )(this[player]);

        R.pipe(
          Mutations.shiftTurn,
          Mutations._updateGame
        )(this.game);
      }
    },

    {
      label: "Accept",
      requirement: function() {
        return Mutations.isReady(this[player]) &&
               !Mutations.didMulligan(this[player])
      },
      perform() {
        R.pipe(
          Mutations.acceptMulligan(false),
          Mutations._updatePlayer
        )(this[player])

        R.pipe(
          Mutations.shiftTurn,
          Mutations._updateGame,
        )(this.game)
      }
    },

    {
      label: "End Turn",
      requirement: function() {
        return !Mutations.hasClicks(this[player]) &&
               Mutations.isTurnOwner(this[player])
      },
      perform() {
        R.pipe(
          Mutations.shiftTurn,
          Mutations._updateGame
        )(this.game)
      }
    },
    {
      label: "Draw card",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {
        Mutations.drawCard(this.player)
        Mutations.click(this.player, 1)
        Mutations._updatePlayer(this.player)
      }
    },

    {
      label: "Receive 1 Credit",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {
        Mutations.receiveCredits(1)
        Mutations.click(this.player, 1)
        Mutations._updatePlayer(this.player)
      }
    },
  ]
}
