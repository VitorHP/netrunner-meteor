import { Modals } from 'meteor/netrunner:modals';
import { Mutations } from '../mutations.js';

export function handContext() {
  return [
    {
      label: 'Install',
      requirement() {
        return Mutations.isOfType(this.card, ['agenda', 'ice']);
      },
      perform() {
        let rezzed;
        let server;
        const _this = this;

        Modals.choiceModal([{ label: 'Rezzed', value: true }, { label: 'Unrezzed', value: false }])
          .then((data) => {
            rezzed = data;

            const serverChoices = _this.player.remote_servers.reduce((memo, s, index) => {
              memo.push({ label: `Server #${index}`, value: index });

              return memo;
            }, [{ label: 'New Server', value: 'new-server' }]);

            return Modals.choiceModal(serverChoices);
          })
          .then((data) => {
            server = data;

            Mutations.removeFromHand(_this.player, _this.card);
            // TODO: comparison with == can maybe lead to problems later?
            Mutations.installCard(
              _this.player,
              _this.card,
              { rezzed: Boolean(rezzed) === true, server_id: server });

            Mutations._updatePlayer(_this.player);
          });
      },
    },
    {
      label: 'Install',
      requirement() {
        return Mutations.isOfType(this.card, ['program', 'hardware', 'resource']);
      },
      perform() {
        Mutations.removeFromHand(this.player, this.card);
        Mutations.installCard(this.player, this.card);
        Mutations._updatePlayer(this.player);
      },
    },
  ];
}
