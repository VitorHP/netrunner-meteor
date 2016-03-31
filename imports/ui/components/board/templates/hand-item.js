Template.handItem.helpers({
  actions() {
    return ActionFactory.handActions(Template.instance().data)
  }
})
