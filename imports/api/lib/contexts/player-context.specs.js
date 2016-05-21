import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import { spies }  from 'meteor/practicalmeteor:sinon';
import { requirement as r, perform as p } from './context-methods.specs.js';
import R from 'ramda';

import { Mutations } from '../mutations.js';
import { PlayerContext } from './player-context.js';

describe('playerContext', function() {
  let player, game;

  beforeEach(function() {
    subject = PlayerContext;
  });

  describe('Actions.global#ready', function() {
    beforeEach(function() {
      game = Spawn.create('Game', { turn_owner: 'runner' })
      player = Spawn.create('Runner', { ready: false, deck_cards: [1, 2, 3, 4, 5], hand: [] })
    });

    describe('requirements', function(){
      it('player is not ready', function(){
        expect(r('ready', subject, { player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game } = p('ready', subject, { player: player, game: game }))
      })

      it('draws 5 cards', function(){
        expect(player.hand.length).to.eq(5)
      })

      it('readies player', function(){
        expect(player.ready).to.eq(true)
      })

      it('shifts turn', function(){
        expect(game.turn_owner).to.eq('corp')
      })
    })
  })

  describe('Actions.global#mulligan', function() {
    beforeEach(function() {
      game = Spawn.create('Game', { turn_owner: 'runner' })
      player = Spawn.create('Runner', { ready: true, mulligan: undefined, deck_cards: [6, 7, 8, 9, 10], hand: [1, 2, 3, 4, 5] })
      opponent = Spawn.create('Corp', { clicks: 0 })
    });

    describe('requirements', function(){
      it('player is ready and did not mulligan', function(){
        expect(r('mulligan', subject, { player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game, opponent } = p('mulligan', subject, { player, game, opponent }))
      })

      it('returns cards to the deck', function(){
        expect(player.deck_cards.length).to.eq(5)
      })


      it('draws another 5 cards', function(){
        expect(R.equals(player.hand, [1, 2, 3, 4, 5])).to.eq(false)
      })

      it('accepts the mulligan', function(){
        expect(player.mulligan).to.eq(true)
      })

      it('shifts turn', function(){
        expect(game.turn_owner).to.eq('corp')
      })
    })
  })

  describe('Actions.global#accept', function() {
    beforeEach(function() {
      game = Spawn.create('Game', { turn_owner: 'runner' })
      player = Spawn.create('Runner', { ready: true, mulligan: undefined, deck_cards: [6, 7, 8, 9, 10], hand: [1, 2, 3, 4, 5] })
      opponent = Spawn.create('Corp', { clicks: 0 })
    });

    describe('requirements', function(){
      it('player is ready and did not mulligan', function(){
        expect(r('accept', subject, { player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game, opponent } = p('accept', subject, { player, game, opponent }))
      })

      it('accepts the current cards', function(){
        expect(R.equals(player.hand, [1, 2, 3, 4, 5])).to.eq(true)
      })

      it('refuses the mulligan', function(){
        expect(player.mulligan).to.eq(false)
      })

      it('shifts turn', function(){
        expect(game.turn_owner).to.eq('corp')
      })
    })
  })

  describe('Actions.global#startGame', function() {
    beforeEach(function(){
      player = Spawn.create("Runner", { mulligan: true, credits: 0 }),
      opponent = Spawn.create("Corp", { mulligan: false, clicks: 0, credits: 0 }),
      game = Spawn.create("Game", { turn: 0 })
    })

    describe('requirements', function(){
      it('both players did mulligan', function() {
        expect(r('start-game', subject, { player, opponent, game })).to.eq(true)
      })
    })

    describe('perform', function(){
      it('fills the corp\'s clicks and starts the first turn', function(){
        ({ player, opponent, game } = p('start-game', subject, { player, opponent, game }))

        expect(opponent.clicks).to.eq(3)
        expect(game.turn).to.eq(1)
      })

      it('gives both the corp and runner 5 credits', function(){
        ({ player, opponent, game } = p('start-game', subject, { player, opponent, game }))

        expect(opponent.credits).to.eq(5)
        expect(player.credits).to.eq(5)
      })
    })
  })

  describe('Actions.global#drawCard', function() {
    beforeEach(function() {
      game = Spawn.create('Game')
      player = Spawn.create('Runner', { clicks: 1, hand: [] })
    });

    describe('requirements', function(){
      it('player has clicks and game is not on wait', function(){
        expect(r('draw-card', subject, { player, game })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game } = p('draw-card', subject, { player, game }))
      })

      it('adds a card to the player\'s hand', function(){
        expect(player.hand.length).to.eq(1)
      })

      it('removes a click', function(){
        expect(player.clicks).to.eq(0)
      })

    })
  })

  describe('Actions.global#receiveCredit', function() {
    beforeEach(function() {
      game = Spawn.create('Game')
      player = Spawn.create('Runner', { clicks: 1, credits: 0 })
    });

    describe('requirements', function(){
      it('player has clicks and game is not on wait', function(){
        expect(r('receive-credit', subject, { player, game })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game } = p('receive-credit', subject, { player, game }))
      })

      it('adds a credit to the player\'s account', function(){
        expect(player.credits).to.eq(1)
      })

      it('removes a click', function(){
        expect(player.clicks).to.eq(0)
      })

    })
  })

  describe('Actions.global#endTurn', function() {
    beforeEach(function() {
      player = Spawn.create('Runner', { clicks: 0, mulligan: true, max_hand_size: 1, hand: ['01001'] })
      opponent = Spawn.create('Corp', { clicks: 0 })
      game = Spawn.create('Game', { turn_owner: 'runner', turn: 1 })
    });

    describe('requirements', function(){
      it('player did mulligan, does not have clicks, is not above hand limit and is the turn owner', function(){
        expect(r('end-turn', subject, { player, game })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ opponent, game } = p('end-turn', subject, { opponent, game }))
      })

      it('advances turn', function(){
        expect(game.turn).to.eq(2)
      })

      it('switches turn owner', function(){
        expect(game.turn_owner).to.eq('corp')
      })

      it('fills the opponent\' clicks', function(){
        expect(opponent.clicks).to.eq(opponent.max_clicks)
      })

    })
  })
})
