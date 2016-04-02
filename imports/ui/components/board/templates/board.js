import './board.html'

import './corp-area.js'
import './runner-area.js'

import { Runner } from '../../../../api/runners/runners.js';
import { Corp } from '../../../../api/corps/corps.js';
import { Game } from '../../../../api/games/games.js';

// debug helpers
import '../lib/helper.js'

Template.board.onCreated(function() {
  this.autorun(() => {
    Meteor.subscribe('Game.game');
  });
});

Template.board.helpers({
  runner() {
    return Runner.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  },

  corp() {
    return Corp.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  },

  game() {
    return Game.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  }
})
