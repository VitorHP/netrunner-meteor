describe("Spawn", function() {
  var runner, game, corp;

  subject = function() {
    return Spawn
  }

  describe ("Spawn#create", function() {
    it ("returns a registered object template", function(){
      subject().register("Man", { name: "Red" })

      expect(subject().create("Man")).to.deep.equal({ name: "Red" })
    })

    it ("modifies the object if params are passed", function(){
      subject().register("Man", { name: "Red" })

      expect(subject().create("Man", { name: "Blue" })).to.deep.equal({ name: "Blue" })
    })
  })
})
