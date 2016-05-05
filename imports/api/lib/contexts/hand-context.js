import { Mutations } from '../mutations.js';
import R from 'ramda';

function serversFor(card, player) {
  const centralServers = [
    { label: 'HQ', value: 'hq' },
    { label: 'R&D', value: 'rnd' },
    { label: 'Archives', value: 'archives' },
  ];

  const remoteServers = player.remote_servers.reduce((memo, server) => {
    memo.push({
      value: server.server_id,
      label: `Server #${server.server_id}`,
    });

    return memo;
  }, [{ value: player.remote_servers.length, label: 'New Remote Server' }]);

  const allServers = R.concat(centralServers, remoteServers);

  switch (card.type_code) {
    case 'agenda':
    case 'asset':
      return remoteServers;
    case 'ice':
    case 'upgrade':
      return allServers;
    default:
      return [];
  }
}

export const HandContext = [
  {
    label: 'Install',
    alias: 'install-corp-card',
    input(data) {
      return {
        type: 'actionDropdown',
        property: 'serverId',
        options: serversFor(data.card, data.player),
      };
    },
    requirement(data) {
      return Mutations.isOfType(data.card, ['agenda', 'ice', 'asset', 'upgrade']) &&
             Mutations.hasClicks(data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.click(1),
          Mutations.removeFromHand([data.card.code]),
          Mutations.installCard(data.card, {
            rezzed: false,
            serverId: data.options.serverId,
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
             Mutations.hasCredits(data.card.cost, data.player);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.click(1),
          Mutations.payCredits(data.card.cost),
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
