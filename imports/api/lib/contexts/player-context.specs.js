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

      it('draws another 5 cards', function(){
        expect(R.equals(player.hand, [1, 2, 3, 4, 5])).to.eq(false)
      })

      it('accepts the mulligan', function(){
        expect(player.mulligan).to.eq(true)
      })

      it('shifts turn', function(){
        expect(game.turn_owner).to.eq('corp')
      })

      it('fills the opponents clicks if player is a runner', function(){
        expect(opponent.clicks).to.eq(3)
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

      it('fills the opponents clicks if player is a runner', function(){
        expect(opponent.clicks).to.eq(3)
      })
    })
  })

  describe('Actions.global#drawCard', function() {
    beforeEach(function() {
      player = Spawn.create('Runner', { clicks: 1, hand: [] })
    });

    describe('requirements', function(){
      it('player has clicks', function(){
        expect(r('draw-card', subject, { player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player } = p('draw-card', subject, { player }))
      })

      it('adds a card to the player\'s hand', function(){
        expect(player.hand.length).to.eq(1)
      })

      it('removes a click', function(){
        expect(player.clicks).to.eq(0)
      })

    })
  })

  describe('Actions.global#drawCard', function() {
    beforeEach(function() {
      player = Spawn.create('Runner', { clicks: 1, credits: 0 })
    });

    describe('requirements', function(){
      it('player has clicks', function(){
        expect(r('receive-credit', subject, { player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player } = p('receive-credit', subject, { player }))
      })

      it('adds a credit to the player\'s account', function(){
        expect(player.credits).to.eq(1)
      })

      it('removes a click', function(){
        expect(player.clicks).to.eq(0)
      })

    })
  })
})
