Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  faction: { type: String, allowedValues: ["corp", "runner"] },
  cardIds: { type: [Number], defaultValue: [] },
  identityCardId: { type: Number },
})

Cards = new Mongo.Collection('cards');

Cards.schema = new SimpleSchema({
  name: { type: String },
  imgSrc: { type: String },
  cardId: { type: Number },
  faction: { type: String, allowedValues: ["corp", "runner"] },
  factionName: { type: String, allowedValues: ["haas-bioroid", "criminal"] },
  type: { type: String, allowedValues: ["agenda", "program", "identity"] }
})

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
  identityCardId: { type: Number, defaultValue: 0 },
  programs: { type: [Object], defaultValue: [] },
  hardwares: { type: [Object], defaultValue: [] },
  resources: { type: [Object], defaultValue: [] },
  "programs.$.cardId": { type: Number },
  "hardware.$.cardId": { type: Number },
  "resources.$.cardId": { type: Number },
})

var _commonHelpers = {
  deckCards() {
    return Cards.find({ cardId: { "$in": this.deckCards } }).fetch()
  },

  identity() {
    return Cards.findOne({ cardId: this.identityCardId })
  },

  deckSize() {
    return this.deckCards.length
  }
}

Runner.helpers(_commonHelpers)

Corp = new Mongo.Collection('corp');

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  backgroundImgSrc: { type: String, defaultValue: "images/cards/background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deckCards: { type: [Number], defaultValue: [] },
  discard: { type: [Number], defaultValue: [] },
  identityCardId: { type: Number, defaultValue: 0 },
  servers: { type: [Object], defaultValue: [] },
  hand: { type: [Number] },
  "servers.$.cards": { type: [Object] },
  "servers.$.cards.$.cardId": { type: Number },
  "servers.$.ices": { type: [Object] },
  "servers.$.ices.$.cardId": { type: Number }
})

Corp.helpers(_commonHelpers)

Game = new Mongo.Collection('game')

Game.schema = new SimpleSchema({
  _id: { type: String },
  turnOwner: { type: String, defaultValue: "corp", allowedValues: ["corp", "runner"] },
  runnerId: { type: String },
  corpId: { type: String }
})
