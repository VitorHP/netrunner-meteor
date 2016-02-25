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

  cardsCount (target) {
    return target.deckCards.length
  },

  click (target, amount) {
    if (amount > target.clicks) return false

    return target.clicks = target.clicks - 1
  },

  drawCard (target) {
    if (this.cardsCount(target) === 0) return false

    target.hand.push(target.deckCards.splice(0, 1)[0])
  },

  receiveCredits (target, amount) {
    target.credits = target.credits + amount
  },

  payCredits (target, amount) {
    if (amount > target.credits) return false

    return target.credits = target.credits - amount
  }
}
