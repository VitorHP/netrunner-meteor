
Corp = new Mongo.Collection('corp');

Corp.schema = new SimpleSchema({
  _id: { type: String },
  deck_id: { type: String },
  background_img_src: { type: String, defaultValue: "/images/cards/corp-background.png" },
  clicks: { type: Number, defaultValue: 0 },
  credits: { type: Number, defaultValue: 0 },
  deck_cards: { type: [String], defaultValue: [] },
  discard: { type: [String], defaultValue: [] },
  identity_card_code: { type: String, defaultValue: 0 },
  hand: { type: [String] },
  side_code: { type: String },
  mulligan: { type: Boolean, optional: true },
  ready: { type: Boolean, defaultValue: null },
  "remote_servers.$.server_id": { type: Number },
  "remote_servers.$.cards": { type: [Object] },
  "remote_servers.$.cards.$.card_code": { type: String },
  "remote_servers.$.cards.$.rezzed": { type: Boolean },
  "remote_servers.$.ices": { type: [Object] },
  "remote_servers.$.ices.$.card_code": { type: String },
  "remote_servers.$.ices.$.rezzed": { type: Boolean }
})

var _corpHelpers = {
  remoteServersCards() {
    let serverCard = function(serverCard){ 
      return {
        card: Cards.findOne({ 'code': serverCard.card_code }),
        rezzed: serverCard.rezzed
      }
    }

    return this.remote_servers.reduce((memo, server) => {
      memo.push({
        ices: server.ices.map(serverCard),
        cards: server.cards.map(serverCard)
      })

      return memo
    }, [])
  }
}

Corp.helpers(R.merge(Players.commonHelpers, _corpHelpers))
