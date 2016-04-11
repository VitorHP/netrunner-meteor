import R from 'ramda';

import { Mutations } from '../mutations.js';

function startOpponentIfRunner(player) {
  return Mutations.isRunner(player) ?
    Mutations.fillClicks :
    R.identity;
}

export const PlayerContext = [
  {
    label: 'Ready',
    alias: 'ready',
    requirement(data) {
      return !Mutations.isReady(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.ready,
          Mutations.shuffleDeck,
          Mutations.drawCard(5)
        )(data.player),

        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),
      };
    },
  },

  {
    label: 'Mulligan',
    alias: 'mulligan',
    requirement(data) {
      return Mutations.isReady(data.player) &&
              !Mutations.didMulligan(data.player);
    },
    perform(data) {
      const fn = startOpponentIfRunner(data.player);

      return {
        player: R.pipe(
          Mutations.acceptMulligan(true),
          Mutations.returnToDeck(data.player.hand, 'hand'),
          Mutations.shuffleDeck,
          Mutations.drawCard(5)
        )(data.player),

        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),

        opponent: R.pipe(
          fn
        )(data.opponent),
      };
    },
  },

  {
    label: 'Accept',
    alias: 'accept',
    requirement(data) {
      return Mutations.isReady(data.player) &&
              !Mutations.didMulligan(data.player);
    },
    perform(data) {
      const fn = startOpponentIfRunner(data.player);

      return {
        player: R.pipe(
          Mutations.acceptMulligan(false)
        )(data.player),

        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),

        opponent: R.pipe(
          fn
        )(data.opponent),
      };
    },
  },

  {
    label: 'End Turn',
    alias: 'end-turn',
    requirement(data) {
      return !Mutations.hasClicks(data.player) &&
              Mutations.isTurnOwner(data.player, data.game);
    },
    perform(data) {
      return {
        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),

        opponent: R.pipe(
          Mutations.fillClicks
        )(data.opponent),
      };
    },
  },
  {
    label: 'Draw card',
    alias: 'draw-card',
    requirement(data) {
      return Mutations.hasClicks(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.drawCard(1),
          Mutations.click(1)
        )(data.player),
      };
    },
  },

  {
    label: 'Receive 1 Credit',
    alias: 'receive-credit',
    requirement(data) {
      return Mutations.hasClicks(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.receiveCredits(1),
          Mutations.click(1)
        )(data.player),
      };
    },
  },
];
