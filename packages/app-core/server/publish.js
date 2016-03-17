
function deckCardCodesList (deckCards) {
  return Object.keys(deckCards).reduce(function(cardCodes, cardCode){
    cardCodes = cardCodes.concat(new Array(deckCards[cardCode]).fill(cardCode))

    return cardCodes
  }, [])
}

Meteor.publishComposite('Game.game', function(deckName){

  return {
    find () {
      return Game.find({ _id: "7MGuiovynhY2TgsbJ" })
    },
    children: [{
      find (game) {
        return Corp.find({ _id: game.corpId })
      },
      children: [{
        find(corp) {
          let cardCodes = Object.keys(Decks.findOne(corp.deckId).cards)

          return Cards.find({ code: { "$in": cardCodes } })
        }
      }]
    },{
      find (game) {
        return Runner.find({ _id: game.runnerId })
      },
      children: [{
        find(runner) {
          let cardCodes = Object.keys(Decks.findOne(runner.deckId).cards)

          return Cards.find({ code: { "$in": cardCodes } })
        }
      }]
    }]
  }
})

