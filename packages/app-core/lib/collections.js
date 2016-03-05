Decks = new Mongo.Collection('decks')

Decks.schema = new SimpleSchema({
  name: { type: String },
  faction: { type: String, allowedValues: ["corp", "runner"] },
  cardCodes: { type: [Number], defaultValue: [] },
  identityCardCode: { type: Number },
})

Cards = new Mongo.Collection('cards');

Cards.schema = new SimpleSchema({
  title: { type: String },
  imgSrc: { type: String },
  code: { type: Number },
  side: { type: String, allowedValues: ["corp", "runner"] },
  faction: { type: String, allowedValues: ["corp", "runner"] },
  factionName: { type: String, allowedValues: ["haas-bioroid", "criminal"] },
  type: { type: String, allowedValues: ["agenda", "program", "identity"] }
})

Cards.helpers({
  backImgSrc() {
    return this.size === "runner" ? "/images/cards/runner-background.png" : "/images/cards/corp-background.png"
  }
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
  identityCardCode: { type: Number, defaultValue: 0 },
  programs: { type: [Object], defaultValue: [] },
  hardwares: { type: [Object], defaultValue: [] },
  resources: { type: [Object], defaultValue: [] },
  "programs.$.cardCode": { type: Number },
  "hardware.$.cardCode": { type: Number },
  "resources.$.cardCode": { type: Number },
})

function cardList(cardCodes) {
  return Cards.find({ code: { "$in": cardCodes } }).fetch()
}

var _commonHelpers = {
  deckCards() {
    return cardList(this.deckCards)
  },

  identity() {
    return Cards.findOne({ code: this.identityCardCode })
  },

  deckSize() {
    return this.deckCards.length
  },

  handCards() {
    return cardList(this.hand)
  },

}

var _runnerHelpers = {
  programCards() {
    return this.programs.map(function(c) {
      return { card: Cards.findOne({ 'code': c.cardCode }) }
    })
  }
}

Runner.helpers(_.extend(_commonHelpers, _runnerHelpers))

Corp = new Mongo.Collection('corp');

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  backgroundImgSrc: { type: String, defaultValue: "/images/cards/corp-background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deckCards: { type: [Number], defaultValue: [] },
  discard: { type: [Number], defaultValue: [] },
  identityCardCode: { type: Number, defaultValue: 0 },
  hand: { type: [Number] },
  "remoteServers.$.serverId": { type: Number },
  "remoteServers.$.cards": { type: [Object] },
  "remoteServers.$.cards.$.cardCode": { type: Number },
  "remoteServers.$.cards.$.rezzed": { type: Boolean },
  "remoteServers.$.ices": { type: [Object] },
  "remoteServers.$.ices.$.cardCode": { type: Number },
  "remoteServers.$.ices.$.rezzed": { type: Boolean }
})

var _corpHelpers = {
  remoteServersCards() {
    let serverCard = function(serverCard){ 
      return {
        card: Cards.findOne({ 'code': serverCard.cardCode }),
        rezzed: serverCard.rezzed
      }
    }

    return this.remoteServers.reduce((memo, server) => {
      memo.push({
        ices: server.ices.map(serverCard),
        cards: server.cards.map(serverCard)
      })

      return memo
    }, [])
  }
}

Corp.helpers(_.extend(_commonHelpers, _corpHelpers))

Game = new Mongo.Collection('game')

Game.schema = new SimpleSchema({
  _id: { type: String },
  turnOwner: { type: String, defaultValue: "corp", allowedValues: ["corp", "runner"] },
  runnerId: { type: String },
  corpId: { type: String }
})
