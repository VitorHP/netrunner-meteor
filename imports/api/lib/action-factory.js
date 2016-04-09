import { PlayerContext } from './contexts/player-context.js';
import { corpContext } from './contexts/corp-context.js';
import { runnerContext } from './contexts/runner-context.js';
import { handContext } from './contexts/hand-context.js';

import R from 'ramda';

import { Mutations } from './mutations.js';

function updateContext(context) {
  switch (context.side_code) {
    case 'corp':
      Mutations._updateCorp(context);
      break;
    case 'runner':
      Mutations._updateRunner(context);
      break;
    default:
      Mutations._updateGame(context);
  }
}

function wrapPerform(fn, data) {
  return function applyData() {
    R.map(updateContext, fn(data));
  };
}

export const ActionFactory = {

  // wraps the perform function with 'this' being the data context of the Template
  allowedActions(actionList, data) {
    return actionList.reduce((memo, action) => {
      const rFn = action.requirement || function returnTrue() { return true; };

      if (rFn(data)) {
        memo.push({
          label: action.label,
          perform: wrapPerform(action.perform, data),
        });
      }

      return memo;
    }, []);
  },

  corpActions(data) {
    const player = 'corp';

    return this.allowedActions(PlayerContext.concat(corpContext(player)), data);
  },

  runnerActions(data) {
    const player = 'runner';

    return this.allowedActions(PlayerContext.concat(runnerContext(player)), data);
  },

  handActions(data) {
    return this.allowedActions(handContext(), data);
  },

};
