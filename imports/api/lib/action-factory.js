import { playerContext } from './contexts/player-context.js';
import { corpContext } from './contexts/corp-context.js';
import { runnerContext } from './contexts/runner-context.js';
import { handContext } from './contexts/hand-context.js';

function wrapPerform(fn, data) {
  return function applyData() {
    return fn.apply(data);
  };
}

export const ActionFactory = {

  // wraps the perform function with 'this' being the data context of the Template
  allowedActions(actionList, data) {
    return actionList.reduce((memo, action) => {
      const rFn = action.requirement || function returnTrue() { return true; };

      if (rFn.apply(data)) {
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

    return this.allowedActions(playerContext(player).concat(corpContext(player)), data);
  },

  runnerActions(data) {
    const player = 'runner';

    return this.allowedActions(playerContext(player).concat(runnerContext(player)), data);
  },

  handActions(data) {
    return this.allowedActions(handContext(), data);
  },

};
