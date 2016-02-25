Meteor.methods({
  'Runner.methods.update'({ runnerId, newRunner }) {

    new SimpleSchema({ runnerId: { type: String } }).validate({runnerId});
    Runner.schema.validate(newRunner)

    const runner = Runner.findOne(runnerId);

    Runner.update(runnerId, newRunner);
  },

  'Corp.methods.update'({ corpId, newCorp }) {

    new SimpleSchema({ corpId: { type: String } }).validate({corpId});
    Corp.schema.validate(newCorp)

    const corp = Corp.findOne(corpId);

    Corp.update(corpId, newCorp);
  }
});
