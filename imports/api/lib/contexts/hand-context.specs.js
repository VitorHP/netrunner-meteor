import { Spawn } from 'meteor/netrunner:spawn';
import { expect } from 'meteor/practicalmeteor:chai';
import { stubs }  from 'meteor/practicalmeteor:sinon';
import { requirement as r, perform as p } from './context-methods.specs.js';

import { Modals } from '../../../ui/components/modals/modals.js';
import { HandContext } from './hand-context.js';

describe("HandContext", function() {
  let runner;
  let corp;
  let game;

  beforeEach(function(){
    runner = Spawn.create("Runner", { clicks: 1 });
    corp = Spawn.create("Corp");
    game = Spawn.create("Game");
    card = Spawn.create("Card", { type_code: "agenda", installCost: 1 })
  })

  describe("HandContext#installCorpCard", function() {
    describe("Requirements", function(){
      it.skip("Requires a click", function(){
        expect(r('install-corp-card', HandContext, { card })).to.eq(true)
      })
    })

    describe("Perform", function(){
      beforeEach(function(){
        stubs.create('cardSideModal', Modals, 'cardSideModal')
        stubs.resolves(true)

        stubs.create('serverChoiceModal', Modals, 'serverChoiceModal')
        stubs.resolves(0)
      })

      it.skip("Installs a card on a player\'s board", function() {
        ('install-corp-card', HandContext, { player: corp, card })

        debugger
      })
    })
  })
})
