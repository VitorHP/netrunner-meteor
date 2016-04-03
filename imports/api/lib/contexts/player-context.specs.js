import { Spawn } from "meteor/netrunner:spawn"

import { PlayerContext } from './player-context.js';

describe("PlayerContext", function() {
  var runner;

  beforeEach(function() {
    runner = Spawn.create("Runner", { ready: false })
    pc = PlayerContext('runner')
  })

  describe ("Actions.global#ready", function() {
    let r;

    beforeEach(function(){

    })

    it.skip ("happens when the player is not ready", function(){

    })

    it.skip ("draws cards for the player then shifts turn", function(){

    })
  })
})
