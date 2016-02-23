Meteor.methods({
  'Runner.methods.update'({ runnerId, newRunner }) {

    new SimpleSchema({ runnerId: { type: String } }).validate({runnerId});
    Runner.schema.validate(newRunner)

    const runner = Runner.findOne(runnerId);

    Runner.update(runnerId, newRunner);
  }
});
