Players = {}

function cardList(cardCodes) {
  let cards = Cards.find({ code: { "$in": cardCodes } }).fetch()

  return cardCodes.map(function(cardCode){
    return cards.find(function(card){ return card.code === cardCode })
  })
}

Players.commonHelpers = {
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

