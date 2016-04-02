import "./actions-common.js"
import "./actions-global.js"
import "./actions-corp.js"
import "./actions-runner.js"
import "./actions-hand.js"

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

    return this.allowedActions(Actions.global(player).concat(Actions.corp(player)), data)
  },

  runnerActions(data) {
    let player = "runner"

    return this.allowedActions(Actions.global(player).concat(Actions.runner(player)), data)
  },

  handActions(data) {
    return this.allowedActions(Actions.hand(), data)
  }

}
