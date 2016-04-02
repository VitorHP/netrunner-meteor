import { Cards } from '../cards/cards.js'

export const Players = {}

function cardList(card_codes) {
  let cards = Cards.find({ code: { "$in": card_codes } }).fetch()

  return card_codes.map(function(card_code){
    return cards.find(function(card){ return card.code === card_code })
  })
}

Players.commonHelpers = {
  deckCards() {
    return cardList(this.deck_cards)
  },

  identity() {
    return Cards.findOne({ code: this.identity_card_code })
  },

  deckSize() {
    return this.deck_cards.length
  },

  handCards() {
    return cardList(this.hand)
  },

}
