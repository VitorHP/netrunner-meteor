import './hand-item.html'

Template.handItem.helpers({
  actions() {
    return ActionFactory.handActions(Template.instance().data)
  }
})
