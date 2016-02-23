Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  cardIds: { type: [Number], defaultValue: [] },
})

Cards = new Mongo.Collection('cards');

Cards.schema = new SimpleSchema({
  name: { type: String },
  imgSrc: { type: String },
  cardId: { type: Number }
})

Runner = new Mongo.Collection('runner');

Runner.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  backgroundImgSrc: { type: String, defaultValue: "images/cards/background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  stack: { type: [Number], defaultValue: [] },
  heap: { type: [Number], defaultValue: [] },
  hand: { type: [Number] },
  identityCardId: { type: Number, defaultValue: 0 },
  programs: { type: [Number], defaultValue: [] },
  hardwares: { type: [Number], defaultValue: [] },
  resources: { type: [Number], defaultValue: [] }
})

Runner.helpers({
  stackCards() {
    return Cards.find({ cardId: { "$in": this.stack } }).fetch()
  },

  identity() {
    return Cards.findOne({ cardId: this.identityCardId })
  },

  stackSize() {
    return this.stack.length
  },

  background() {
    return { imgSrc: this.backgroundImgSrc }
  },

  click(amount) {
    if (amount > this.clicks) return false

    return this.clicks = this.clicks - 1
  },

  draw(){
    if (this.stackSize() === 0) return false

    return this.hand.push(this.stack.splice(0, 1)[0])
  }
})

Corp = new Mongo.Collection('corp');

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  stack: { type: [Number], defaultValue: [] },
  heap: { type: [Number], defaultValue: [] },
  identityCardId: { type: Number, defaultValue: 0 },
  servers: { type: [Object], defaultValue: [] },
  hand: { type: [Number] },
  "servers.$.cardId": { type: Number },
  "servers.$.ices": { type: [Object] },
  "servers.$.ices.$.cardId": { type: Number }
})
