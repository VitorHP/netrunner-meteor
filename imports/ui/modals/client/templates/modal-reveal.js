function wrapCards(cards, cardsToReveal) {
  return cards.map(function(c){
    return {
      card_code: c.code,
      revealed: cards.length <= cardsToReveal
    }
  })
}

function unwrapCards(wrappedCards, cards) {
  return wrappedCards.map(function(wc){
    return {
      card: cards.find(function(c){ return c.code == wc.card_code }),
      revealed: wc.revealed
    }
  })
}

Template.modalReveal.onCreated(function(){
  let data = Template.instance().data

  this.state = new ReactiveDict()
  this.state.set("cards", wrapCards(data.cards, data.cardsToReveal))
  this.state.set("cardsToReveal", data.cardsToReveal)
})

Template.modalReveal.helpers({
  wrappedCards() {
    let instance = Template.instance()

    return unwrapCards(instance.state.get("cards"), instance.data.cards)
  }
})

Template.modalReveal.events({
  "click .modal-reveal__card": function(event){
    let state = Template.instance().state,
        cardIndex,
        cards;

    if (state.get("cardsToReveal") > 0) {
      cardIndex = event.currentTarget.dataset.index,
      cards = state.get("cards")
      cards[cardIndex].revealed = true

      state.set("cards", cards)
      state.set("cardsToReveal", state.get("cardsToReveal") - 1)
    }
  }
})
