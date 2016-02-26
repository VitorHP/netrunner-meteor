
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
          let cardIds = Decks.findOne(corp.deckId).cardIds

          return Cards.find({ cardId: { "$in": cardIds } })
        }
      }]
    },{
      find (game) {
        return Runner.find({ _id: game.runnerId })
      },
      children: [{
        find(runner) {
          let cardIds = Decks.findOne(runner.deckId).cardIds

          return Cards.find({ cardId: { "$in": cardIds } })
        }
      }]
    }]
  }
})
