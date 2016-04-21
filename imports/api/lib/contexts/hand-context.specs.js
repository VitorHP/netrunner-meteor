import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import * as sinon from 'sinon';
import 'sinon-as-promised';
import { requirement as r, perform as p } from './context-methods.specs.js';

import { Modals } from '../../../ui/components/modals/modals.js';
import { HandContext } from './hand-context.js';

describe("HandContext", function() {
  let player;
  let card;

  describe("HandContext#installCorpCard", function() {
    beforeEach(function(){
      player = Spawn.create("Corp", { hand: ['01001'] });
      card = Spawn.create("Card", { code: '01001', type_code: "agenda", install_cost: 1 });
    })

    describe("Requirements", function(){
      it("Requires a click", function(){
        expect(r('install-corp-card', HandContext, { card })).to.eq(true)
      })
    })

    describe("Perform", function(){

      beforeEach(function(){
        let cardSideModal = sinon.stub()
        cardSideModal.resolves(true)
        let serverChoiceModal = sinon.stub()
        serverChoiceModal.resolves(0)

        Modals.cardSideModal = cardSideModal
        Modals.serverChoiceModal = serverChoiceModal
      })

      it("Installs a card on a corp\'s server", function() {
        p('install-corp-card', HandContext, { player, card })
          .then(function(vals){
            expect(vals.player.remote_servers.length).to.equal(1)
          })
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
})
