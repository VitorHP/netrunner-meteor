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
