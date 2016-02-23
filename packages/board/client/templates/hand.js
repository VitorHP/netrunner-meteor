Template.hand.helpers({
  cards() {
    return Cards.find({ cardId: { "$in": this.cardIds || [] } }).fetch()
  }
})
