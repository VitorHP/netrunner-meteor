import R from 'ramda';

import { Mutations } from '../mutations.js';

export function playerContext() {
  return [
    {
      label: 'Ready',
      requirement() {
        return !Mutations.isReady(this.player);
      },
      perform() {
        return {
          player: R.pipe(
            Mutations.ready,
            Mutations.shuffleDeck,
            Mutations.drawCard(5)
          )(this.player),

          game: R.pipe(
            Mutations.shiftTurn
          )(this.game),
        };
      },
    },

    {
      label: 'Mulligan',
      requirement() {
        return Mutations.isReady(this.player) &&
               !Mutations.didMulligan(this.player);
      },
      perform() {
        return {
          player: R.pipe(
            Mutations.acceptMulligan(true),
            Mutations.returnToDeck(this.player.hand, 'hand'),
            Mutations.shuffleDeck,
            Mutations.drawCard(5)
          )(this.player),

          game: R.pipe(
            Mutations.shiftTurn
          )(this.game),
        };
      },
    },

    {
      label: 'Accept',
      requirement() {
        return Mutations.isReady(this.player) &&
               !Mutations.didMulligan(this.player);
      },
      perform() {
        return {
          player: R.pipe(
            Mutations.acceptMulligan(false)
          )(this.player),

          game: R.pipe(
            Mutations.shiftTurn
          )(this.game),
        };
      },
    },

    {
      label: 'End Turn',
      requirement() {
        return !Mutations.hasClicks(this.player) &&
               Mutations.isTurnOwner(this.player);
      },
      perform() {
        return {
          game: R.pipe(
            Mutations.shiftTurn
          )(this.game),
        };
      },
    },
    {
      label: 'Draw card',
      requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {
        return {
          player: R.pipe(
            Mutations.drawCard(5),
            Mutations.click(1)
          )(this.player),
        };
      },
    },

    {
      label: 'Receive 1 Credit',
      requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {
        return {
          player: R.pipe(
            Mutations.receiveCredits(1),
            Mutations.click(1)
          )(this.player),
        };
      },
    },
  ];
}
