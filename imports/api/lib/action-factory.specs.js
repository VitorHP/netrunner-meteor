import { expect } from 'meteor/practicalmeteor:chai'
import { stubs, sinon }  from 'meteor/practicalmeteor:sinon';
import R from "ramda";
import '/imports/tests/support/spawns.js'

import { Mutations } from './mutations.js';

import { ActionFactory } from "./action-factory.js";

describe('ActionFactory', function() {
  describe('ActionsFactory#allowedActions', function() {
    let action,
        runner = Spawn.create("Runner"),
        standardAction = {
          label: 'Standard',
          alias: 'standard',
          requirement(context){ return true; },
          perform(context){ return context; },
        },
        noRequirement = {
          label: 'No Requirement',
          alias: 'no-requirement',
          perform(context){ return context; },
        };

    it('checks a requirement for an action', function(){
      stubs.create('requirement', standardAction, 'requirement')
      stubs.requirement.returns(true)

      expect(ActionFactory.allowedActions([standardAction])[0].alias)
        .to.equal('standard')
      expect(stubs.requirement).to.have.been.calledWith()

      stubs.restoreAll()
    })

    describe('when requirements pass', function(){
      afterEach(function(){
        stubs.restoreAll()
      })

      it('returns a wrapped function which performs the action', function(){
        stubs.create('perform', standardAction, 'perform')
        stubs.perform.returns({})

        action = ActionFactory.allowedActions([standardAction])[0]

        action.perform({})

        expect(stubs.perform).to.have.been.calledWith()
      })

      it('updates the context after executed', function(){
        stubs.create('_updateRunner', Mutations, '_updateRunner')

        action = ActionFactory.allowedActions([standardAction], { runner: runner })[0]

        action.perform({})

        expect(stubs._updateRunner).to.have.been.calledWith(runner)
      })
    })

    describe('Hooks', function(){
      afterEach(function(){
        stubs.restoreAll()
      })

      it('afterPerform executes other actions after the current', function(){
        const actionWithHook = {
          label: 'After',
          requirement(){ return true; },
          perform(context){ return context; },
          afterPerform: ['standard'],
        }

        stubs.create('hookPerform', standardAction, 'perform')
        stubs.hookPerform.returns({ a: 1 })

        action = ActionFactory.allowedActions([actionWithHook, standardAction], {})[0]

        action.perform({})

        expect(stubs.hookPerform).to.have.been.calledWith({ options: {} })
      })

      it('beforePerform executes other actions before the current', function(){
        const actionWithHook = {
          label: 'Before',
          requirement(){ return true; },
          perform(context){ return context; },
          beforePerform: ['standard']
        }

        stubs.create('hookPerform', standardAction, 'perform')
        stubs.hookPerform.returns({ a: 1 })

        action = ActionFactory.allowedActions([actionWithHook, standardAction], {})[0]

        action.perform({})

        expect(stubs.hookPerform).to.have.been.calledWith({ options: {} })
      })

    })

    describe('allows options to be passed on the fly for the action', function(){
      let action = {
        label: 'Standard',
        alias: 'standard',
        requirement(context){ return true; },
        perform(context){ context.options.spy(); return {}; },
      };
      let options = {
        spy: sinon.spy()
      };

      it('passes the options down to the perform method of the action', function(){
        action = ActionFactory.allowedActions([action], {})[0]

        action.perform(options)

        expect(options.spy).to.have.been.calledWith()
      })
    })

    describe('dynamic input type', function(){
      let action = {
        label: 'Standard',
        alias: 'standard',
        requirement(context){ return true; },
        perform(context){ context.options.spy(); return {}; },
      };
      let customInputAction = {
        label: 'Standard',
        alias: 'standard',
        input: function(){ return { type: 'custom' } },
        requirement(context){ return true; },
        perform(context){ context.options.spy(); return {}; },
      };

      it('uses default input type if none specified', function(){
        action = ActionFactory.allowedActions([action], {})[0]

        expect(action.input.type).to.equal('action')
      })

      it('uses custom input type if specified', function(){
        action = ActionFactory.allowedActions([customInputAction], {})[0]

        expect(action.input.type).to.equal('custom')
      })
    })
  })
})
