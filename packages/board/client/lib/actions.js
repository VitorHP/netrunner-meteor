Modules.actions = {}

let _updateRunner = (runner) => {
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
}

// public

let cardsCount = (target) => {
  return target.deckCards.length
}

let click = (target, amount) => {
  if (amount > target.clicks) return false

  return target.clicks = target.clicks - 1
}

let drawCard = (target) => {
  if (click(target, 1)  === false)    return false
  if (cardsCount(target) === 0) return false

  target.hand.push(target.deckCards.splice(0, 1)[0])
}

let receiveCredits = (target, amount) => {
  target.credits = target.credits + amount
}

let payCredits = (target, amount) => {
  if (amount > target.credits) return false

  return target.credits = target.credits - amount
}

Modules.actions.cardsCount     = cardsCount;
Modules.actions.click          = click;
Modules.actions.drawCard       = drawCard;
Modules.actions.receiveCredits = receiveCredits;
Modules.actions.payCredits     = payCredits;
