import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import * as sinon from 'sinon';
import 'sinon-as-promised';
import { requirement as r, perform as p } from './context-methods.specs.js';

import { HandContext } from './hand-context.js';

describe("HandContext", function() {
  let player;
  let card;

  describe("HandContext#preInstall", function() {
    beforeEach(function(){
      game = Spawn.create("Game")
      player = Spawn.create("Corp", { hand: ['01001'], clicks: 1 });
      card = Spawn.create("Card", { code: '01001', type_code: "agenda", cost: 1 });
    })

    describe("Requirements", function(){
      it ("Requires a click", function(){
        expect(r('pre-install', HandContext, { player, card, game })).to.eq(true)
      })
    })

    describe("Perform", function(){
      it("Changes wait state to 'discard-from-table'", function() {
        ({ game } = p('pre-install', HandContext, { game }))
        expect(game.wait).to.equal('discard-from-table')
      })
    })
  })

  describe("HandContext#installCorpCard", function() {
    beforeEach(function(){
      game = Spawn.create("Game", { wait: 'discard-from-table' })
      player = Spawn.create("Corp", { hand: ['01001'], clicks: 1 });
      card = Spawn.create("Card", { code: '01001', type_code: "agenda", cost: 1 });
    })

    describe("Requirements", function(){
      it("Requires a click", function(){
        expect(r('install-corp-card', HandContext, { game, card, player })).to.eq(true)
      })
    })

    describe("Perform", function(){

      it("Installs a card on a corp\'s server", function() {
        ({ player, card, game } = p('install-corp-card', HandContext, { player, card, game, options: { serverId: 0 } }))

        expect(player.remote_servers.length).to.equal(1)
      })

      it("Clears waiting state", function() {
        ({ player, card, game } = p('install-corp-card', HandContext, { player, card, game, options: { serverId: 0 } }))

        expect(game.wait).to.equal('')
      })
    })
  })

  describe("HandContext#installRunnerCard", function() {
    beforeEach(function(){
      game = Spawn.create("Game", { wait: 'discard-from-table' })
      player = Spawn.create("Runner", { hand: ['01001'], credits: 2, clicks: 1 });
      card = Spawn.create("Card", { code: '01001', type_code: "program", cost: 2 });
    })

    describe("Requirements", function(){
      it("Requires a click and enought credits", function(){
        expect(r('install-runner-card', HandContext, { game, player, card })).to.eq(true)
      })
    })

    describe("Perform", function(){
      it("Clears waiting state", function() {
        ({ player, card, game } = p('install-runner-card', HandContext, { player, card, game }))

        expect(game.wait).to.equal('')
      })

      it("Installs a card on a runner's grid", function() {
        ({ player, card, game } = p('install-runner-card', HandContext, { player, card, game }))

        expect(player.programs.length).to.equal(1)
      })

      it("Costs a click", function() {
        ({ player, card, game } = p('install-runner-card', HandContext, { player, card, game }))

        expect(player.clicks).to.equal(0)
      })

      it("Reduces the credits of the runner by the card's cost", function() {
        ({ player, card, game } = p('install-runner-card', HandContext, { player, card, game }))

        expect(player.credits).to.equal(0)
      })
    })
  })

  describe("HandContext#discard", function() {
    beforeEach(function(){
      player = Spawn.create("Runner", { clicks: 0, max_hand_size: 1, hand: ['01001', '01002'] });
      game = Spawn.create("Game", { turn_owner: 'runner' });
      card = Spawn.create("Card", { code: '01001' })
    })

    describe("Requirements", function(){
      it("Is player's turn, he has no more clicks and is above hand limit", function(){
        expect(r('discard-from-hand', HandContext, { player, game })).to.eq(true)
      })
    })

    describe("Perform", function(){
      it("Discards a card from the Runner's hand", function() {
        ({ player, card } = p('discard-from-hand', HandContext, { player, card }))

        expect(player.discard).to.include('01001')
        expect(player.hand).to.not.include('01001')
      })
    })
  })
})
