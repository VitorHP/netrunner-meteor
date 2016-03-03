
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
          let cardCodes = Decks.findOne(corp.deckId).cardCodes

          return Cards.find({ code: { "$in": cardCodes } })
        }
      }]
    },{
      find (game) {
        return Runner.find({ _id: game.runnerId })
      },
      children: [{
        find(runner) {
          let cardCodes = Decks.findOne(runner.deckId).cardCodes

          return Cards.find({ code: { "$in": cardCodes } })
        }
      }]
    }]
  }
})
