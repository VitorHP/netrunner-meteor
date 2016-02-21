Template.board.onCreated(function() {
  this.autorun(() => {
    Meteor.subscribe('Runner.runner');
  });
});

Template.board.helpers({
  runner() {
    return Runner.findOne({ _id: "7MGuiovynhY2TgsbJ" })
  }
})
