import { Zoom } from '../../zoom/templates/zoom.js'

import './card.html'

Template.card.onRendered(function() {
  Zoom.on(Template.instance().view._domrange.$('img'))
});

Template.card.helpers({
  cardImg(card, rezzed=true) {
    if (card)
      return rezzed ? card.img_src : card.backImgSrc()
  }
})