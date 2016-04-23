import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { N } from './n.js';
import { L } from './lenses.js';

export const Mutations = {
  // DB
  _updateRunner(runner) {
    return Meteor.call('Runner.methods.update', {
      runner_id: runner._id,
      newRunner: runner,
    }, (err) => {
      if (err) {
        // error
      } else {
        // success
      }
    });
  },

  _updateCorp(corp) {
    return Meteor.call('Corp.methods.update', {
      corp_id: corp._id,
      newCorp: corp,
    }, (err) => {
      if (err) {
        // error
      } else {
        // success
      }
    });
  },

  _updatePlayer(player) {
    return player.identity().side_code === 'corp' ?
      Mutations._updateCorp(player) :
      Mutations._updateRunner(player);
  },

  _updateGame(game) {
    return Meteor.call('Game.methods.update', {
      gameId: game._id,
      newGame: game,
    }, (err) => {
      if (err) {
        // error
      } else {
        // success
      }
    });
  },

  // common

  isRunner(player) {
    return player.side_code === 'runner';
  },

  click: R.curry((amount, player) => R.over(L.clicks, R.flip(R.subtract)(amount), player)),

  hasClicks(player) {
    return R.gt(R.view(L.clicks, (player || {})), 0);
  },

  fillClicks(player) {
    return R.over(L.clicks, R.add(R.view(L.maxClicks, (player || {}))), player);
  },

  isAboveHandLimit(player) {
    return player.hand.length > player.max_hand_size
  },

  drawCard: R.curry((count, player) => {
    const draw = R.view(L.deckCards, R.over(L.deckCards, R.take(count), player));

    return R.over(L.deckCards, R.drop(count), R.over(L.hand, R.concat(draw), player));
  }),

  trashFromHand(player, cardCode) {
    const targetIndex = R.indexOf(cardCode, R.view(L.hand, player));
    const cardAtIndex = R.compose(L.hand, R.lensIndex(targetIndex));

    const discarded = R.over(L.discard, R.append(R.view(cardAtIndex, player)), player);

    return R.over(L.hand, R.remove(targetIndex, 1), discarded);
  },

  hasCredits: R.curry((amount, player) => R.gte(R.view(L.credits, player), amount)),

  receiveCredits: R.curry((amount, player) => R.over(L.credits, R.add(amount), player)),

  payCredits(amount, player) {
    return R.over(L.credits, R.subtract(amount), player);
  },

  ready(player) {
    return R.set(L.ready, true, player);
  },

  isReady(player) {
    return R.view(L.ready, (player || {})) === true;
  },

  acceptMulligan: R.curry((accepted, player) =>
    R.set(L.mulligan, accepted, player)
  ),

  didMulligan(player) {
    return !R.isNil(R.view(L.mulligan, (player || {})));
  },

  removeCards: R.curry((collection, cardCodes, player) => {
    const removeCards = R.curry((cardsToRemove, col) =>
      cardsToRemove.reduce((memo, card) => {
        const index = memo.indexOf(card);
        return R.remove(index, 1, memo);
      }, col)
    );

    return R.over(L[collection], removeCards(cardCodes), player);
  }),

  moveCards: R.curry((fromCollection, toCollection, cardCodes, player) => {
    const cardsRemoved = Mutations.removeCards(fromCollection, cardCodes, player);

    return R.over(L[toCollection], R.concat(cardCodes), cardsRemoved);
  }),

  removeFromHand: R.curry((cardCodes, player) =>
    Mutations.removeCards('hand', cardCodes, player)
  ),

  returnToDeck: R.curry((cardCodes, player) =>
    Mutations.moveCards('hand', 'deckCards', cardCodes, player)
  ),

  discard: R.curry((cardCodes, player) =>
    Mutations.moveCards('hand', 'discard', cardCodes, player)
  ),

  // Game

  shiftTurn(game) {
    const nextTurnOwner = R.view(L.turnOwner, (game || {})) === 'corp' ? 'runner' : 'corp';

    return R.set(L.turnOwner, nextTurnOwner, game);
  },

  newTurn: R.over(L.turn, R.inc),

  isTurnOwner(player, game) {
    return player && game && game.turn_owner === player.side_code;
  },

  gameStarted(game) {
    return game.turn > 0;
  },

  // Deck

  shuffleDeck(player) {
    return R.over(L.deckCards, N.shuffle, player);
  },

  // Cards

  isOfType(card, typeCode) {
    const typeCodes = typeCode instanceof Array ? typeCode : [typeCode];

    return typeCodes.some((t) => t === card.type_code);
  },

  isCorpCard(card) {
    return card.side_code === 'corp';
  },

  isRunnerCard(card) {
    return !Mutations.isCorpCard(card);
  },

  _findOrInitializeServer(player, options) {
    const server = R.compose(L.remoteServers,
                           R.lensIndex(options.server_id));

    return R.view(server, player) !== undefined ?
      player :
      R.over(L.remoteServers, R.append({ server_id: options.server_id,
                                       cards: [],
                                       ices: [] }), player);
  },

  _installCorpCard: R.curry((lens, card, player, options) => {
    const target = R.compose(L.remoteServers,
                           R.lensIndex(options.server_id),
                           lens);

    return R.over(target, R.append({
      card_code: card.code,
      rezzed: options.rezzed,
    }), Mutations._findOrInitializeServer(player, options));
  }),

  _installRunnerCard: R.curry((lens, card, player) =>
    R.over(lens, R.append({ card_code: card.code }), player)
  ),

  installCard: R.curry((card, options, player) => {
    const fns = {
      program: Mutations._installRunnerCard(L.programs),
      hardware: Mutations._installRunnerCard(L.hardware),
      resource: Mutations._installRunnerCard(L.resources),

      agenda: Mutations._installCorpCard(L.cards),
      ice: Mutations._installCorpCard(L.ices),
    };

    return fns[card.type_code](card, player, options);
  }),

};

