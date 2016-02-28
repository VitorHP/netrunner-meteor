Actions.common = {
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

  _updatePlayer(player) {
    player.identity().faction == "corp" ? Actions.common._updateCorp(player) : Actions.common._updateRunner(player)
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

  hasClicks (target) {
    return (target || {}).clicks > 0
  },

  // Game

  shiftTurn (target) {
    target.turnOwner = target.turnOwner == "corp" ? "runner" : "corp"
  },

  // Cards

  isOfType(card, type) {
    let types = type instanceof Array ? type : [type]

    return types.some(function(t) { return t == card.type })
  },

  isCorpCard(card) {
    return card.faction === "corp"
  },

  isRunnerCard(card) {
    return !Actions.common.isCorpCard(card)
  },

  installCard(player, card) {
    let fns = {
      program(player, card) {
        player.programs.push({
          cardId: card.cardId
        })
      }
    }

    fns[card.type](player, card)
  },

  removeFromHand(player, card) {
    let cardIndex = player.hand.indexOf(card.cardId)

    return player.hand.splice(cardIndex, 1)
  }
}
