if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.card.helpers({
    src: "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg"
  })

  Template.ice.helpers({
    src: "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg"
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
