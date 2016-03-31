import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Runner = new Mongo.Collection('runner');

Runner.schema = new SimpleSchema({
  _id: { type: String },
  deck_id: { type: String },
  background_img_src: { type: String, defaultValue: "images/cards/background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deck_cards: { type: [String], defaultValue: [] },
  discard: { type: [String], defaultValue: [] },
  hand: { type: [String] },
  identity_card_code: { type: String, defaultValue: 0 },
  programs: { type: [Object], defaultValue: [] },
  hardware: { type: [Object], defaultValue: [] },
  resources: { type: [Object], defaultValue: [] },
  side_code: { type: String },
  mulligan: { type: Boolean, optional: true },
  ready: { type: Boolean, defaultValue: null },
  "programs.$.card_code": { type: String },
  "hardware.$.card_code": { type: String },
  "resources.$.card_code": { type: String },
})

function rigCards(collection) {
  return collection.map(function(c) {
    return { card: Cards.findOne({ 'code': c.card_code }) }
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

Runner.helpers(R.merge(Players.commonHelpers, _runnerHelpers))

export { Runner };
