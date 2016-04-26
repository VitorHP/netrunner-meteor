import { Mutations } from '../mutations.js';
import R from 'ramda';

export const HandContext = [
  {
    label: 'Install',
    alias: 'install-corp-card',
    requirement(data) {
      return Mutations.isOfType(data.card, ['agenda', 'ice']) &&
             Mutations.hasClicks(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.click(1),
          Mutations.removeFromHand([data.card.code]),
          Mutations.installCard(data.card, {
            rezzed: false,
            server_id: data.options.serverId,
          })
        )(data.player),
      };
    },
  },
  {
    label: 'Install',
    alias: 'install-runner-card',
    requirement(data) {
      return Mutations.isOfType(data.card, ['program', 'hardware', 'resource']) &&
             Mutations.hasClicks(data.player) &&
             Mutations.hasCredits(data.card.install_cost, data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.click(1),
          Mutations.removeFromHand([data.card.code]),
          Mutations.installCard(data.card, {})
        )(data.player),
      };
    },
  },

  {
    label: 'Discard',
    alias: 'discard',
    requirement(data) {
      return Mutations.isTurnOwner(data.player, data.game) &&
             !Mutations.hasClicks(data.player) &&
             Mutations.isAboveHandLimit(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.discard([data.card.code])
        )(data.player),
      };
    },
  },
];
