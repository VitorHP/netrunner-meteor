
Corp = new Mongo.Collection('corp');

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deckId: { type: String },
  backgroundImgSrc: { type: String, defaultValue: "/images/cards/corp-background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deckCards: { type: [String], defaultValue: [] },
  discard: { type: [String], defaultValue: [] },
  identityCardCode: { type: String, defaultValue: 0 },
  hand: { type: [String] },
  side_code: { type: String },
  mulligan: { type: Boolean, optional: true },
  ready: { type: Boolean, defaultValue: null },
  "remoteServers.$.serverId": { type: Number },
  "remoteServers.$.cards": { type: [Object] },
  "remoteServers.$.cards.$.cardCode": { type: String },
  "remoteServers.$.cards.$.rezzed": { type: Boolean },
  "remoteServers.$.ices": { type: [Object] },
  "remoteServers.$.ices.$.cardCode": { type: String },
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

Corp.helpers(_.extend(Players.commonHelpers, _corpHelpers))
