import { Spawn } from "netrunner:spawn"

describe("PlayerContext", function() {
  var runner;

  beforeEach(function() {
    runner = Spawn.create("Runner", { ready: false })
  })

  describe ("Actions.global#ready", function() {
    it.skip ("happens when the player is not ready", function(){

    })

    it.skip ("draws cards for the player then shifts turn", function(){

    })
  })
})
