Template.board.onCreated(function() {
  this.autorun(() => {
    Meteor.subscribe('Runner.runner');
    Meteor.subscribe('Corp.corp');
  });
});

Template.board.helpers({
  runner() {
    return Runner.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  },

  corp() {
    return Corp.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  }
})
