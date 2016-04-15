import { expect } from 'meteor/practicalmeteor:chai'
import { stubs }  from 'meteor/practicalmeteor:sinon';
import R from "ramda";
import '/imports/tests/support/spawns.js'

import { Mutations } from './mutations.js';

import { ActionFactory } from "./action-factory.js";

describe('ActionFactory', function() {
  describe('ActionsFactory#allowedActions', function() {
    let action,
        runner = Spawn.create("Runner"),
        standardAction = {
          label: 'Test',
          alias: 'test',
          requirement(context){ return true; },
          perform(context){ return context; },
        },
        noRequirement = {
          label: 'No Requirement',
          alias: 'no-requirement',
          perform(){},
        };

    it('checks a requirement for an action', function(){
      stubs.create('requirement', standardAction, 'requirement')
      stubs.requirement.returns(true)

      expect(ActionFactory.allowedActions([standardAction])[0].alias)
        .to.equal('test')
      expect(stubs.requirement).to.have.been.calledWith()

      stubs.restoreAll()
    })

    describe('when there\'s no requirement function', function(){
      it('returns the action as if passing the requirements', function(){
        expect(ActionFactory.allowedActions([noRequirement])[0].alias)
          .to.equal('no-requirement')
      })
    })

    describe('when requirements pass', function(){
      afterEach(function(){
        stubs.restoreAll()
      })

      it('returns a wrapped function which performs the action', function(){
        stubs.create('perform', standardAction, 'perform')
        stubs.perform.returns({})

        action = ActionFactory.allowedActions([standardAction])[0]

        action.perform()

        expect(stubs.perform).to.have.been.calledWith()
      })

      it('throws an error if the wrapped function does not return an object', function(){
        stubs.create('perform', standardAction, 'perform')
        stubs.perform.returns(undefined)

        action = ActionFactory.allowedActions([standardAction])[0]

        expect(action.perform).to.throw(Error)
      })

      it('updates the context after executed', function(){
        stubs.create('_updateRunner', Mutations, '_updateRunner')

        action = ActionFactory.allowedActions([standardAction], { runner: runner })[0]

        action.perform()

        expect(stubs._updateRunner).to.have.been.calledWith(runner)
      })
    })
  })
})
