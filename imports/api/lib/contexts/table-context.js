import { Mutations } from '../mutations.js';

import R from 'ramda';

export const TableContext = [
  {
    label: 'Trash',
    alias: 'discard-from-table',
    requirement(data) {
      return Mutations.isWaitingFor('discard-from-table', data.game);
    },
    perform(data) {
      return {
        player: R.pipe(
          Mutations.removeCards(data.options.collection, [data.options.cardCode])
        )(data.player),
      };
    },
  },
];
