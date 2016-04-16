import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { N } from './n.js';

const deckCards = N.lensProp('deck_cards');
const hand = N.lensProp('hand');
const clicks = N.lensProp('clicks');
const credits = N.lensProp('credits');
const discard = N.lensProp('discard');
const ready = N.lensProp('ready');
const mulligan = N.lensProp('mulligan');
const turnOwner = N.lensProp('turn_owner');
const programs = N.lensProp('programs');
const hardware = N.lensProp('hardware');
const resources = N.lensProp('resources');
const remoteServers = N.lensProp('remote_servers');
const cards = N.lensProp('cards');
const ices = N.lensProp('ices');
const maxClicks = N.lensProp('max_clicks');
const turn = N.lensProp('turn');

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

  click: R.curry((amount, player) => R.over(clicks, R.flip(R.subtract)(amount), player)),

  hasClicks(player) {
    return R.gt(R.view(clicks, (player || {})), 0);
  },

  fillClicks(player) {
    return R.over(clicks, R.add(R.view(maxClicks, (player || {}))), player);
  },

  drawCard: R.curry((count, player) => {
    const draw = R.view(deckCards, R.over(deckCards, R.take(count), player));

    return R.over(deckCards, R.drop(count), R.over(hand, R.concat(draw), player));
  }),

  trashFromHand(player, cardCode) {
    const targetIndex = R.indexOf(cardCode, R.view(hand, player));
    const cardAtIndex = R.compose(hand, R.lensIndex(targetIndex));

    const discarded = R.over(discard, R.append(R.view(cardAtIndex, player)), player);

    return R.over(hand, R.remove(targetIndex, 1), discarded);
  },

  receiveCredits: R.curry((amount, player) => R.over(credits, R.add(amount), player)),

  payCredits(amount, player) {
    return R.over(credits, R.subtract(amount), player);
  },

  returnToDeck: R.curry((cardsReturned, collection, player) => {
    const removeFromCollection = R.curry((cardsToRemove, playerHand) =>
      cardsToRemove.reduce((memo, card) => {
        const index = memo.indexOf(card);
        return R.remove(index, 1, memo);
      }, playerHand)
    );

    const handWithoutCards =
      R.over(hand, removeFromCollection(cardsReturned), player);

    return R.over(deckCards, R.concat(cardsReturned), handWithoutCards);
  }),

  ready(player) {
    return R.set(ready, true, player);
  },

  isReady(player) {
    return R.view(ready, (player || {})) === true;
  },

  acceptMulligan: R.curry((accepted, player) =>
    R.set(mulligan, accepted, player)
  ),

  didMulligan(player) {
    return !R.isNil(R.view(mulligan, (player || {})));
  },

  removeFromHand(player, card) {
    const cardIndex = player.hand.indexOf(card.code);

    return player.hand.splice(cardIndex, 1);
  },

  // Game

  shiftTurn(game) {
    const nextTurnOwner = R.view(turnOwner, (game || {})) === 'corp' ? 'runner' : 'corp';

    return R.set(turnOwner, nextTurnOwner, game);
  },

  newTurn: R.over(turn, R.inc),

  isTurnOwner(player, game) {
    return player && game && game.turn_owner === player.side_code;
  },

  gameStarted(game) {
    return game.turn > 0;
  },

  // Deck

  shuffleDeck(player) {
    return R.over(deckCards, N.shuffle, player);
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
    const server = R.compose(remoteServers,
                           R.lensIndex(options.server_id));

    return R.view(server, player) !== undefined ?
      player :
      R.over(remoteServers, R.append({ server_id: options.server_id,
                                       cards: [],
                                       ices: [] }), player);
  },

  _installCorpCard: R.curry((lens, card, player, options) => {
    const target = R.compose(remoteServers,
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

  installCard(player, card, options) {
    const fns = {
      program: Mutations._installRunnerCard(programs),
      hardware: Mutations._installRunnerCard(hardware),
      resource: Mutations._installRunnerCard(resources),

      agenda: Mutations._installCorpCard(cards),
      ice: Mutations._installCorpCard(ices),
    };

    return fns[card.type_code](card, player, options);
  },

};

