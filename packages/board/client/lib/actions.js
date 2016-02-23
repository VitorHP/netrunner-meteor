Modules.actions = {}

let _updateRunner = (runner) => {
  return Meteor.call('Runner.methods.update', {
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

let drawCard = (runner) => {
  if (!(runner.click(1) === false)) {
    runner.draw()
    _updateRunner(runner)
  }
}
Modules.actions.drawCard = drawCard;
