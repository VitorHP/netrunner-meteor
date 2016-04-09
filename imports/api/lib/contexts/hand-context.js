import { Modals } from '../../../ui/components/modals/modals.js';
import { Mutations } from '../mutations.js';

export function handContext() {
  return [
    {
      label: 'Install',
      requirement(data) {
        return Mutations.isOfType(data.card, ['agenda', 'ice']);
      },
      perform(data) {
        let rezzed;
        let server;

        Modals.choiceModal([{ label: 'Rezzed', value: true }, { label: 'Unrezzed', value: false }])
          .then((d) => {
            rezzed = d;

            const serverChoices = data.player.remote_servers.reduce((memo, s, index) => {
              memo.push({ label: `Server #${index}`, value: index });

              return memo;
            }, [{ label: 'New Server', value: 'new-server' }]);

            return Modals.choiceModal(serverChoices);
          })
          .then((d) => {
            server = d;

            Mutations.removeFromHand(data.player, data.card);
            // TODO: comparison with == can maybe lead to problems later?
            Mutations.installCard(
              data.player,
              data.card,
              { rezzed: Boolean(rezzed) === true, server_id: server });

            Mutations._updatePlayer(data.player);
          });
      },
    },
    {
      label: 'Install',
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
}
