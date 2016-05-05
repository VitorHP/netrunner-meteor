import { ActionFactory } from '../../../../api/lib/action-factory.js';
import { Template } from 'meteor/templating';
import { Zoom } from '../../zoom/zoom.js';

import './card.html';

Template.card.onRendered(() => Zoom.on(Template.instance().view._domrange.$('img')));

Template.card.helpers({
  cardImg(card, rezzed = true) {
    return card && (rezzed ? card.img_src : card.backImgSrc());
  },

  actions(context) {
    return ActionFactory.actions(context, Template.instance().data);
  },
});
