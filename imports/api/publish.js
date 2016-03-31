
function deckCardCodesList (deck_cards) {
  return Object.keys(deck_cards).reduce(function(card_codes, card_code){
    card_codes = card_codes.concat(new Array(deck_cards[card_code]).fill(card_code))

    return card_codes
  }, [])
}

Meteor.publishComposite('Game.game', function(deckName){

  return {
    find () {
      return Game.find({ _id: "7MGuiovynhY2TgsbJ" })
    },
    children: [{
      find (game) {
        return Corp.find({ _id: game.corp_id })
      },
      children: [{
        find(corp) {
          let card_codes = Object.keys(Decks.findOne(corp.deck_id).cards)

          return Cards.find({ code: { "$in": card_codes } })
        }
      }]
    },{
      find (game) {
        return Runner.find({ _id: game.runner_id })
      },
      children: [{
        find(runner) {
          let card_codes = Object.keys(Decks.findOne(runner.deck_id).cards)

          return Cards.find({ code: { "$in": card_codes } })
        }
      }]
    }]
  }
})

