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

    it ("returns different objects every time", function(){
      subject().register("Man", { name: "Red" })

      var obj1 = subject().create("Man"),
          obj2 = subject().create("Man");

      obj1.name = "Blue"

      expect(obj1).to.not.deep.equal(obj2)
    })

    it ("returns deeply different objects every time", function(){
      subject().register("Man", { name: "Red", games: ["Red", "Blue", "Yellow"] })

      var obj1 = subject().create("Man"),
          obj2 = subject().create("Man");

      obj1.games = ["Blue"]

      expect(obj1).to.not.deep.equal(obj2)
    })
  })
})
