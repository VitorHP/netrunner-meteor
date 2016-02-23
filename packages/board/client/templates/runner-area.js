Template.runnerArea.helpers({
  actions() {
    const instance = Template.instance()

    return [
      {
        label: "Draw cards",
        perform() {
          let runner = instance.data.runner
          runner.hand.push(runner.stack.splice(0, 1)[0])

          Meteor.call('Runner.methods.update', {
            runnerId: runner._id,
            newRunner: runner
          }, (err, res) => {
            if (err) {
              alert(err);
            } else {
              console.log("Mama mia!")
            }
          });
        }
      }
    ]
  },

})
