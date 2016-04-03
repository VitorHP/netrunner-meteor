import { Runner } from '../../api/runners/runners.js';
import { Corp }   from '../../api/corps/corps.js';
import { Game }   from '../../api/games/games.js';

import './board-container.html'
import '../components/board/board.js'

Template.boardContainer.onCreated(function(){
  this.autorun(() => {
    Meteor.subscribe('Game.game');
  });
})

Template.boardContainer.helpers({
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
