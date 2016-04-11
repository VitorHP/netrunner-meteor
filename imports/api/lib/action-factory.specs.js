import { expect } from 'meteor/practicalmeteor:chai'
import { stubs }  from 'meteor/practicalmeteor:sinon';
import R from "ramda";

import { ActionFactory } from "./action-factory.js";

describe('ActionFactory', function() {
  describe('ActionsFactory#allowedActions', function() {
    let action,
        standardAction = {
          label: 'Test',
          alias: 'test',
          requirement(){},
          perform(){},
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
    })

    describe('when there\'s no requirement function', function(){
      it('returns the action as if passing the requirements', function(){
        expect(ActionFactory.allowedActions([noRequirement])[0].alias)
          .to.equal('no-requirement')
      })
    })
  })
})
