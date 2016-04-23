import R from 'ramda';

import { Mutations } from '../mutations.js';

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
      return {
        player: R.pipe(
          Mutations.acceptMulligan(true),
          Mutations.returnToDeck(data.player.hand),
          Mutations.shuffleDeck,
          Mutations.drawCard(5)
        )(data.player),

        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),
      };
    },
    afterPerform: ['start-game'],
  },

  {
    label: 'Accept',
    alias: 'accept',
    requirement(data) {
      return Mutations.isReady(data.player) &&
              !Mutations.didMulligan(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.acceptMulligan(false)
        )(data.player),

        game: R.pipe(
          Mutations.shiftTurn
        )(data.game),
      };
    },
    afterPerform: ['start-game'],
  },

  {
    label: 'Start Game',
    alias: 'start-game',
    requirement(data) {
      return Mutations.didMulligan(data.player) &&
             Mutations.didMulligan(data.opponent) &&
             !Mutations.gameStarted(data.game);
    },
    perform(data) {
      const corp = data.player.side_code === 'corp' ? 'player' : 'opponent';

      return {
        [corp]: R.pipe(
          Mutations.fillClicks
        )(data[corp]),
        game: R.pipe(
          Mutations.newTurn
        )(data.game),
      };
    },
  },

  {
    label: 'End Turn',
    alias: 'end-turn',
    requirement(data) {
      return Mutations.didMulligan(data.player) &&
             !Mutations.hasClicks(data.player) &&
             Mutations.isTurnOwner(data.player, data.game) &&
             !Mutations.isAboveHandLimit(data.player);
    },
    perform(data) {
      return {
        game: R.pipe(
          Mutations.shiftTurn,
          Mutations.newTurn
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
