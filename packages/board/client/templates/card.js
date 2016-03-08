Template.card.onRendered(function() {
  Zoom.on(Template.instance().view._domrange.$('img'))
});

Template.card.helpers({
  cardImg(card, rezzed=true) {
    if (card)
      return rezzed ? card.imgSrc : card.backImgSrc()
  }
})
