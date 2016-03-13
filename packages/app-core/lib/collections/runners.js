
Runner = new Mongo.Collection('runner');

Runner.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  backgroundImgSrc: { type: String, defaultValue: "images/cards/background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deckCards: { type: [Number], defaultValue: [] },
  discard: { type: [Number], defaultValue: [] },
  hand: { type: [Number] },
  identityCardCode: { type: Number, defaultValue: 0 },
  programs: { type: [Object], defaultValue: [] },
  hardware: { type: [Object], defaultValue: [] },
  resources: { type: [Object], defaultValue: [] },
  "programs.$.cardCode": { type: Number },
  "hardware.$.cardCode": { type: Number },
  "resources.$.cardCode": { type: Number },
})

function rigCards(collection) {
  return collection.map(function(c) {
    return { card: Cards.findOne({ 'code': c.cardCode }) }
  })
}

var _runnerHelpers = {
  programCards() {
    return rigCards(this.programs)
  },
  hardwareCards() {
    return rigCards(this.hardware)
  },
  resourceCards() {
    return rigCards(this.resources)
  }
}

Runner.helpers(_.extend(Players.commonHelpers, _runnerHelpers))
