import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layout/app-layout.html'
import '../../ui/containers/board-container.js'

FlowRouter.route('/', {
  name: 'Board.show',
  action() {
    BlazeLayout.render('App_layout', {main: 'boardContainer'});
  }
});
