
Template.card.helpers({
  cardImg(card, rezzed=true) {
    if (card)
      return rezzed ? card.imgSrc : card.backImgSrc()
  },

  classes(card) {
    return card && (card.type_code === "ice") ? "card--ice" : ""
  }
})
