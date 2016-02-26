
function extractParams (params, data) {
  return params.map(function(param){
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

    return this.allowedActions([
      {
        label: "End Turn",
        requirementParams: [player],
        requirement: function(player) {
          return !Modules.actions.common.hasClicks(player)
        },
        performParams: ['game'],
        perform(game) {
          Modules.actions.common.shiftTurn(game)
          Modules.actions.common._updateGame(game)
        }
      },

      {
        label: "Draw card",
        requirementParams: [player],
        requirement: function(player) {
          return Modules.actions.common.hasClicks(player)
        },
        performParams: [player],
        perform(player) {
          Modules.actions.common.drawCard(player)
          Modules.actions.common.click(player, 1)
          Modules.actions.common._updateCorp(player)
        }
      },
    ], data)
  }
}

      // {
      //   label: "Receive 1 Credit",
      //   requirement: function() {
      //     return actions.hasClicks(player)
      //   },
      //   perform() {
      //     actions.common.receiveCredits(1)
      //     actions.common.click(player, 1)
      //     actions.common._updateCorp(player)
      //   }
      // }
  // corpActions(corp) {
  //   return [
  //     {
  //       label: "Install an card",
  //       perform() {

  //       }
  //     },
  //     {
  //       label: "Play an operation",
  //       perform() {

  //       }
  //     },
  //     {
  //       label: "Advance a card",
  //       perform() {

  //       }
  //     },
  //     {
  //       label: "Trash Runner's Resource",
  //       perform() {

  //       }
  //     },
  //     {
  //       label: "Purge Virus",
  //       perform() {

  //       }
  //     },
  //     {
  //       label: "Trigger ability",
  //       perform() {

  //       }
  //     }
  //   ]
