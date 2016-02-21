FlowRouter.route('/', {
  name: 'Board.show',
  action() {
    BlazeLayout.render('App_layout', {main: 'board'});
  }
});
