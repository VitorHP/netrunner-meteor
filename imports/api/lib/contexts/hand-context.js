import { Modals } from '../../../ui/components/modals/modals.js';

import { Mutations } from '../mutations.js';
import R from 'ramda';

export const HandContext = [
  {
    label: 'Install',
    alias: 'install-corp-card',
    requirement(data) {
      return Mutations.isOfType(data.card, ['agenda', 'ice']);
    },
    perform(data) {
      let rezzed;
      let server;

      return Modals.cardSideModal()
        .then((d) => {
          rezzed = d;

          return Modals.serverChoiceModal(data.player.remote_servers);
        })
        .then((d) => {
          server = d;

          debugger
          return {
            player: R.pipe(
              Mutations.removeFromHand(data.card),
              Mutations.installCard(data.card, {
                rezzed: Boolean(rezzed) === true,
                server_id: server,
              }),
              Mutations._updatePlayer
            )(data.player),
          };
        });
    },
  },
  {
    label: 'Install',
    alias: 'install-runner-card',
    requirement(data) {
      return Mutations.isOfType(data.card, ['program', 'hardware', 'resource']);
    },
    perform(data) {
      Mutations.removeFromHand(data.player, data.card);
      Mutations.installCard(data.player, data.card);
      Mutations._updatePlayer(data.player);
    },
  },
];
