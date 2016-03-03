
Template.card.helpers({
  cardImg(card, rezzed=true) {
    if (card)
      return rezzed ? card.imgSrc : card.backImgSrc()
  }
})
