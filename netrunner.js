if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.card.helpers({
    src: "images/cards/core/Netrunner-accelerated-beta-test-01055.png"
  })

  Template.ice.helpers({
    src: "images/cards/core/Netrunner-accelerated-beta-test-01055.png"
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
