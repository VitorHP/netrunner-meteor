import { Meteor } from 'meteor/meteor';
import 'meteor/reywood:publish-composite';

import { Runner } from './runners/runners.js';
import { Corp } from './corps/corps.js';
import { Game } from './games/games.js';
import { Decks } from './decks/decks.js';
import { Cards } from './cards/cards.js';

Meteor.publishComposite('Game.game', () => ({
  find() {
    return Game.find({ _id: '7MGuiovynhY2TgsbJ' });
  },
  children: [{
    find(game) {
      return Corp.find({ _id: game.corp_id });
    },
    children: [{
      find(corp) {
        const cardCodes = Object.keys(Decks.findOne(corp.deck_id).cards);

        return Cards.find({ code: { $in: cardCodes } });
      },
    }],
  }, {
    find(game) {
      return Runner.find({ _id: game.runner_id });
    },
    children: [{
      find(runner) {
        const cardCodes = Object.keys(Decks.findOne(runner.deck_id).cards);

        return Cards.find({ code: { $in: cardCodes } });
      },
    }],
  }],
}));

