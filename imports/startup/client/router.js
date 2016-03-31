import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layout/app-layout.html'
import '../../ui/components/board/templates/board.js'

FlowRouter.route('/', {
  name: 'Board.show',
  action() {
    BlazeLayout.render('App_layout', {main: 'board'});
  }
});
