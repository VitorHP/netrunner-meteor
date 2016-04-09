import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import { spies }  from 'meteor/practicalmeteor:sinon';
import R from 'ramda';

import { Mutations } from '../mutations.js';
import { PlayerContext } from './player-context.js';

function method(label, subject){
  return R.find(R.propEq('label', label), subject);
}

function requirement(label, subject) {
  return method(label, subject).requirement;
}

function perform(label, subject) {
  return method(label, subject).perform;
}

describe('playerContext', function() {
  let player, game;

  beforeEach(function() {
    subject = PlayerContext;
  });

  describe('Actions.global#ready', function() {
    beforeEach(function() {
      game = Spawn.create('Game')
      player = Spawn.create('Runner', { ready: false, deck_cards: [1, 2, 3, 4, 5], hand: [] })
    });

    describe('requirements', function(){
      it('player is not ready', function(){
        expect(requirement('Ready', subject)({ player: player })).to.eq(true)
      })
    })

    describe('perform', function(){
      beforeEach(function(){
        ({ player, game } = perform('Ready', subject)({ player: player, game: game }))
      })

      it('draws 5 cards', function(){
        expect(player.hand.length).to.eq(5)
      })

      it('readies player', function(){
        expect(player.ready).to.eq(true)
      })
    })
  })
})
