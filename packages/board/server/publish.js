
Meteor.publishComposite('Runner.runner', function(deckName){

  return {
    find () {
      return Runner.find({ _id: "7MGuiovynhY2TgsbJ" })
    },
    children: [{
      find(runner) {
        let cardIds = Decks.findOne(runner.deckId).cardIds

        return Cards.find({ cardId: { "$in": cardIds } })
      }
    }]
  }
})

Meteor.publishComposite('Corp.corp', function(deckName){

  return {
    find () {
      return Corp.find({ _id: "7MGuiovynhY2TgsbJ" })
    },
    children: [{
      find(corp) {
        let cardIds = Decks.findOne(corp.deckId).cardIds

        return Cards.find({ cardId: { "$in": cardIds } })
      }
    }]
  }
})
