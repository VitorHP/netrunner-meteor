import { Cards } from '../cards/cards.js';

export const Players = {};

function cardList(cardCodes) {
  const cards = Cards.find({ code: { $in: cardCodes } }).fetch();

  return cardCodes.map((cardCode) => cards.find((card) => card.code === cardCode));
}

Players.commonHelpers = {
  deckCards() {
    return cardList(this.deck_cards);
  },

  identity() {
    return Cards.findOne({ code: this.identity_card_code });
  },

  deckSize() {
    return this.deck_cards.length;
  },

  handCards() {
    return cardList(this.hand);
  },

};
