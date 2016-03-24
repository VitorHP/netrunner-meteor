var deckCards = R.lensProp('deckCards')
var hand      = R.lensProp('hand')
var clicks    = R.lensProp('clicks')
var credits   = R.lensProp('credits')

Actions.common = {
  // DB
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
    player.identity().side_code == "corp" ? Actions.common._updateCorp(player) : Actions.common._updateRunner(player)
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

  //common

  click (amount, player) {
    return R.over(clicks, R.subtract(amount), player)
  },

  drawCard (count=1, player) {
    let draw = R.view(deckCards, R.over(deckCards, R.take(count), player))

    return R.over(deckCards, R.drop(count), R.over(hand, R.concat(draw), player))
  },

  trashCard (target, targetCollection, cardCode) {
    let targetIndex = targetCollection.indexOf(cardCode)

    target.discard.push(targetCollection.splice(targetIndex, 1)[0])
  },

  returnToDeck (target, cards) {
    target.deckCards.push.apply(target.deckCards, cards.splice(0, cards.length))
  },

  receiveCredits (amount, player) {
    return R.over(credits, R.add(amount), player)
  },

  payCredits (target, amount) {
    if (amount > target.credits) return false

    return target.credits = target.credits - amount
  },

  hasClicks (target) {
    return (target || {}).clicks > 0
  },

  ready (player) {
    return player.ready = true
  },

  isReady (player) {
    return (player || {}).ready === true
  },

  acceptMulligan (player, accepted) {
    player.mulligan = accepted
  },

  didMulligan (player) {
    return (player || {}).mulligan !== undefined
  },

  // Game

  shiftTurn (target) {
    target.turnOwner = target.turnOwner == "corp" ? "runner" : "corp"
  },

  isTurnOwner (game, player) {
    (player || {}).side_code === (game || {}).turnOwner
  },

  // Deck

  shuffleDeck (target) {
    target.deckCards = _.shuffle(target.deckCards)
  },

  // Cards

  isOfType(card, type_code) {
    let type_codes = type_code instanceof Array ? type_code : [type_code]

    return type_codes.some(function(t) { return t == card.type_code })
  },

  isCorpCard(card) {
    return card.side_code === "corp"
  },

  isRunnerCard(card) {
    return !Actions.common.isCorpCard(card)
  },

  _installProgram(player, card) {
    player.programs.push({
      cardCode: card.code
    })
  },

  _installHardware(player, card) {
    player.hardware.push({
      cardCode: card.code
    })
  },

  _installResource(player, card) {
    player.resources.push({
      cardCode: card.code
    })
  },

  _findOrInitializeServer(player, options) {
    //TODO: Comparison with == can maybe lead to problems later?
    let server = player.remoteServers.find(function(s) { return s.serverId == options.serverId })

    if (server)
      return server

    player.remoteServers.push({ serverId: player.remoteServers.length, cards: [], ices: [] })

    return player.remoteServers[player.remoteServers.length - 1]
  },

  _installAgenda(player, card, options) {
    Actions.common._findOrInitializeServer(player, options).cards.push({
      cardCode: card.code,
      rezzed: options.rezzed
    })
  },

  _installIce(player, card, options) {
    Actions.common._findOrInitializeServer(player, options).ices.push({
      cardCode: card.code,
      rezzed: options.rezzed
    })
  },

  installCard(player, card, options) {
    let fns = {
      program: Actions.common._installProgram,
      hardware: Actions.common._installHardware,
      resource: Actions.common._installResource,

      agenda: Actions.common._installAgenda,
      ice: Actions.common._installIce
    }

    fns[card.type_code](player, card, options)
  },

  removeFromHand(player, card) {
    let cardIndex = player.hand.indexOf(card.code)

    return player.hand.splice(cardIndex, 1)
  }
}

