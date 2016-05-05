import { PlayerContext } from './contexts/player-context.js';
import { corpContext } from './contexts/corp-context.js';
import { runnerContext } from './contexts/runner-context.js';
import { HandContext } from './contexts/hand-context.js';

import R from 'ramda';

import { Mutations } from './mutations.js';

export const ActionFactory = {

  allowedActions(actionList, data) {
    return actionList.reduce((acc, action) => {
      const checkedAction =
        this._wrapAction(action, data, this._fetchHooks(action, actionList));

      return checkedAction ?
        R.concat(acc, [checkedAction]) :
        acc;
    }, []);
  },

  _wrapAction(action, data, hooks) {
    return action.requirement(data) ?
      this._wrapPerform(action, data, hooks) :
      false;
  },

  _fetchHooks(action, actionList) {
    function findHookAction(hookAlias) {
      const hookAction = R.find(R.propEq('alias', hookAlias), actionList);

      if (hookAction === undefined) {
        throw new Error(`Action \'${hookAlias}'\ not found in actionList`);
      }

      return hookAction;
    }

    return {
      before: R.map(findHookAction, (action.beforePerform || [])),
      after: R.map(findHookAction, (action.afterPerform || [])),
    };
  },

  _wrapPerform(action, data, hooks) {
    const trigger = R.curry((triggerAction, triggerData) => {
      return triggerAction.requirement(triggerData) ?
        R.merge(triggerData, triggerAction.perform(triggerData)) :
        triggerData;
    });

    const performs = R.flatten([
      R.map(trigger, hooks.before),
      trigger(action),
      R.map(trigger, hooks.after),
      this._updateContext,
    ]);


    return {
      label: action.label,
      alias: action.alias,
      input: (action.input && action.input(data)) || this._defaultActionInput(),
      perform(options) {
        return R.pipe(
          ...performs
        )(R.merge(data, { options: options || {} }));
      },
    };
  },

  _updateContext: R.map((context) => {
    switch (context.type_code) {
      case 'corp':
        Mutations._updateCorp(context);
        break;
      case 'runner':
        Mutations._updateRunner(context);
        break;
      case 'game':
        Mutations._updateGame(context);
        break;
      default:
        break;
    }

    return true;
  }),

  _defaultActionInput() {
    return {
      type: 'action',
    };
  },

  actions(context, data) {
    switch (context) {
      case 'hand':
        return this.allowedActions(HandContext, data);
      case 'corp':
        return this.allowedActions(PlayerContext.concat(corpContext()), data);
      case 'runner':
        return this.allowedActions(PlayerContext.concat(runnerContext()), data);
      default:
        return [];
    }
  },

};
