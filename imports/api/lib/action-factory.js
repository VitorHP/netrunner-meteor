import { PlayerContext } from "./contexts/player-context.js"
import { CorpContext }   from "./contexts/corp-context.js"
import { RunnerContext } from "./contexts/runner-context.js"
import { HandContext }   from "./contexts/hand-context.js"

function wrapPerform (fn, data) {
  return function() {
    return fn.apply(data)
  }
}

ActionFactory = {

  // wraps the perform function with 'this' being the data context of the Template
  allowedActions (actionList, data) {
    return actionList.reduce(function(memo, action){
      rFn = action.requirement || function() { return true }

      if (rFn.apply(data))
        memo.push({
          label: action.label,
          perform: wrapPerform(action.perform, data)
        })

      return memo
    }, [])

  },

  corpActions(data) {
    let player = "corp"

    return this.allowedActions(PlayerContext(player).concat(CorpContext(player)), data)
  },

  runnerActions(data) {
    let player = "runner"

    return this.allowedActions(PlayerContext(player).concat(RunnerContext(player)), data)
  },

  handActions(data) {
    return this.allowedActions(HandContext(), data)
  }

}
