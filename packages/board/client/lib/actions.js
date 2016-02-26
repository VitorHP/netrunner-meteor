Modules.actions = {}

Modules.actions.common = {
  _updateRunner (runner) {
    return Meteor.call('Runner.methods.update', {
      runnerId: runner._id,
      newRunner: runner
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log("Mama mia!")
      }
    });
  },

  _updateCorp (corp) {
    return Meteor.call('Corp.methods.update', {
      corpId: corp._id,
      newCorp: corp
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log("Mama mia!")
      }
    });
  },

  _updateGame (game) {
    return Meteor.call('Game.methods.update', {
      gameId: game._id,
      newGame: game
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log("Mama mia!")
      }
    });
  },

  click (target, amount) {
    if (amount > target.clicks) return false

    return target.clicks = target.clicks - amount
  },

  drawCard (target) {
    if (target.deckCards.length === 0) return false

    target.hand.push(target.deckCards.splice(0, 1)[0])
  },

  trashCard (target, targetCollection, cardId) {
    let targetIndex = targetCollection.indexOf(cardId)

    target.discard.push(targetCollection.splice(targetIndex, 1)[0])
  },

  receiveCredits (target, amount) {
    target.credits = target.credits + amount
  },

  payCredits (target, amount) {
    if (amount > target.credits) return false

    return target.credits = target.credits - amount
  },

  shiftTurn (target) {
    target.turnOwner = target.turnOwner == "corp" ? "runner" : "corp"
  }
}
