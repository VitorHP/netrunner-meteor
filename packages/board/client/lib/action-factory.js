
function extractParams (params, data) {
  return (params || [] ).map(function(param){
    return data[param]
  })
}

function wrapPerform (fn, params) {
  return function() {
    return fn.apply(undefined, params)
  }
}

ActionFactory = {

  // Data can contain Runner, Corp or Game collections
  allowedActions (actionList, data) {
    return actionList.reduce(function(memo, action){
      rFn = action.requirement || function() { return true }

      if (rFn.apply(undefined, extractParams(action.requirementParams, data)))
        memo.push({
          label: action.label,
          perform: wrapPerform(action.perform, extractParams(action.performParams, data))
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

  cardActions(card) {
    return this.allowedActions(Actions.cards(card), {})
  }
}
