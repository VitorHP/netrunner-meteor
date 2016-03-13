Players = {}

function cardList(cardCodes) {
  return Cards.find({ code: { "$in": cardCodes } }).fetch()
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

