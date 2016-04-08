import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Game } from './games/games.js';
import { Runner } from './runners/runners.js';
import { Corp } from './corps/corps.js';

Meteor.methods({
  'Runner.methods.update'({ runner_id, newRunner }) {
    new SimpleSchema({ runner_id: { type: String } }).validate({ runner_id });
    Runner.schema.validate(newRunner);

    Runner.update(runner_id, newRunner);
  },

  'Corp.methods.update'({ corp_id, newCorp }) {
    new SimpleSchema({ corp_id: { type: String } }).validate({ corp_id });
    Corp.schema.validate(newCorp);

    Corp.update(corp_id, newCorp);
  },

  'Game.methods.update'({ gameId, newGame }) {
    new SimpleSchema({ gameId: { type: String } }).validate({ gameId });
    Game.schema.validate(newGame);

    Game.update(gameId, newGame);
  },
});

