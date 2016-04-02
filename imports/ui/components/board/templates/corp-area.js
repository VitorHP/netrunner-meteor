import './corp-area.html'

import './card.js'
import './deck.js'
import './action-list.js'
import './hand.js'

import "../../../../api/lib/action-factory.js"

Template.corpArea.helpers({
  actions() {
    return ActionFactory.corpActions(Template.instance().data)
  },

  active (turn_owner) {
    return turn_owner == "corp" ? "corp-area--active" : ""
  }

})
