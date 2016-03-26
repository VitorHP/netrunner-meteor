var deckCards     = R.lensProp('deck_cards')
var hand          = R.lensProp('hand')
var clicks        = R.lensProp('clicks')
var credits       = R.lensProp('credits')
var discard       = R.lensProp('discard')
var ready         = R.lensProp('ready')
var mulligan      = R.lensProp('mulligan')
var turnOwner     = R.lensProp('turn_owner')
var programs      = R.lensProp('programs')
var hardware      = R.lensProp('hardware')
var resources     = R.lensProp('resources')
var remoteServers = R.lensProp('remoteServers')
var cardCode      = R.lensProp('card_code')
var cards         = R.lensProp('cards')
var ices          = R.lensProp('ices')

Actions.common = {
  // DB
  _updateRunner (runner) {
    return Meteor.call('Runner.methods.update', {
      runner_id: runner._id,
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
      corp_id: corp._id,
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

  hasClicks (player) {
    return R.gt(R.view(clicks, player), 0)
  },

  drawCard (count=1, player) {
    let draw = R.view(deckCards, R.over(deckCards, R.take(count), player))

    return R.over(deckCards, R.drop(count), R.over(hand, R.concat(draw), player))
  },

  trashFromHand (player, cardCode) {
    let targetIndex = R.indexOf(cardCode, R.view(hand, player))
    let cardAtIndex = R.compose(hand, R.lensIndex(targetIndex))

    let discarded   = R.over(discard, R.append(R.view(cardAtIndex, player)), player)

    return R.over(hand, R.remove(targetIndex, 1), discarded)
  },

  receiveCredits (amount, player) {
    return R.over(credits, R.add(amount), player)
  },

  payCredits (amount, player) {
    return R.over(credits, R.subtract(amount), player)
  },

  returnToDeck (cards, player) {
    return R.over(deckCards, R.concat(cards), player)
  },

  ready (player) {
    return R.set(ready, true, player)
  },

  isReady (player) {
    return R.view(ready, (player || {})) === true
  },

  acceptMulligan (accepted, player) {
    return R.set(mulligan, accepted, player)
  },

  didMulligan (player) {
    return R.view(mulligan, (player || {})) !== undefined
  },

  removeFromHand(player, card) {
    let cardIndex = player.hand.indexOf(card.code)

    return player.hand.splice(cardIndex, 1)
  },

  // Game

  shiftTurn (game) {
    let nextTurnOwner = R.view(turnOwner, (game || {})) == "corp" ? "runner" : "corp"

    return R.set(turnOwner, nextTurnOwner, game)
  },

  isTurnOwner (player, game) {
    return R.view(turnOwner, (game || {})) === player
  },

  // Deck

  shuffleDeck (player) {
    let shuffle = _.shuffle

    return R.over(deckCards, shuffle, player)
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

  _findOrInitializeServer(player, options) {
    let server = R.compose(remoteServers, 
                           R.lensIndex(options.server_id))

    return R.view(server, player) !== undefined ?
      player :
      R.over(remoteServers, R.append({ server_id: options.server_id,
                                       cards:    [],
                                       ices:     [] }), player)
  },

  _installCorpCard: R.curry((lens, card, player, options) => {
    let target = R.compose(remoteServers,
                           R.lensIndex(options.server_id),
                           lens)

    return R.over(target, R.append({
             card_code: card.code,
             rezzed: options.rezzed
           }), Actions.common._findOrInitializeServer(player, options))
  }),

  _installRunnerCard: R.curry((lens, card, player) => {
    return R.over(lens, R.append({ card_code: card.code }), player)
  }),

  installCard(player, card, options) {
    let fns = {
      program:  Actions.common._installRunnerCard(programs),
      hardware: Actions.common._installRunnerCard(hardware),
      resource: Actions.common._installRunnerCard(resources),

      agenda:   Actions.common._installCorpCard(cards),
      ice:      Actions.common._installCorpCard(ices)
    }

    return fns[card.type_code](card, player, options)
  },

}

