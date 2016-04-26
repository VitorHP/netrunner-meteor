import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import * as sinon from 'sinon';
import 'sinon-as-promised';
import { requirement as r, perform as p } from './context-methods.specs.js';

import { HandContext } from './hand-context.js';

describe("HandContext", function() {
  let player;
  let card;

  describe("HandContext#installCorpCard", function() {
    beforeEach(function(){
      player = Spawn.create("Corp", { hand: ['01001'], clicks: 1 });
      card = Spawn.create("Card", { code: '01001', type_code: "agenda", install_cost: 1 });
    })

    describe("Requirements", function(){
      it("Requires a click", function(){
        expect(r('install-corp-card', HandContext, { card, player })).to.eq(true)
      })
    })

    describe("Perform", function(){

      it("Installs a card on a corp\'s server", function() {
        ({ player, card } = p('install-corp-card', HandContext, { player, card, options: { serverId: 0 } }))

        expect(player.remote_servers.length).to.equal(1)
      })
    })
  })

  describe("HandContext#installRunnerCard", function() {
    beforeEach(function(){
      player = Spawn.create("Runner", { hand: ['01001'], credits: 2, clicks: 1 });
      card = Spawn.create("Card", { code: '01001', type_code: "program", install_cost: 2 });
    })

    describe("Requirements", function(){
      it("Requires a click and enought credits", function(){
        expect(r('install-runner-card', HandContext, { player, card })).to.eq(true)
      })
    })

    describe("Perform", function(){
      it("Installs a card on a runner's grid", function() {
        ({ player, card } = p('install-runner-card', HandContext, { player, card }))

        expect(player.programs.length).to.equal(1)
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
        expect(r('discard', HandContext, { player, game })).to.eq(true)
      })
    })

    describe("Perform", function(){
      it("Discards a card from the Runner's hand", function() {
        ({ player, card } = p('discard', HandContext, { player, card }))

        expect(player.discard).to.include('01001')
        expect(player.hand).to.not.include('01001')
      })
    })
  })
})
