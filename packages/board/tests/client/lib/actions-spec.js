describe("Actions.common", function() {
  var runner, game, corp;

  beforeEach(function() {
    runner = {
      "_id" : "7MGuiovynhY2TgsbJ",
      "deckId" : "sfHfp6WobMieubfYZ",
      "backgroundImgSrc" : "images/cards/background.png",
      "clicks" : 2,
      "credits" : 1,
      "deckCards" : [2, 3],
      "discard" : [],
      "hand" : [],
      "identityCardId" : 1,
      "programs" : [],
      "hardwares" : [],
      "resources" : []
    }
    corp = {
      "_id" : "7MGuiovynhY2TgsbJ",
      "deckId" : "sfHfp6WobMieubfYZ",
      "backgroundImgSrc" : "images/cards/corp-background.png",
      "clicks" : 2,
      "credits" : 1,
      "deckCards" : [],
      "discard" : [],
      "hand" : [2, 3],
      "identityCardId" : 1,
      "servers" : []
    }
    game = {
      "_id" : "7MGuiovynhY2TgsbJ",
      "runnerId" : "7MGuiovynhY2TgsbJ",
      "corpId" : "7MGuiovynhY2TgsbJ",
      "turnOwner" : "corp"
    }
  })

  subject = function() {
    return Actions.common
  }

  it ("Actions.common#drawCard removes a card from the deck and places it on the runner's hand", function() {
    subject().drawCard(runner)

    expect(runner.deckCards.length).to.equal(1)
  })

  it ("Actions.common#click reduces the target clicks by the amount specified", function() {
    subject().click(runner, 2)

    expect(runner.clicks).to.equal(0)
  })

  it ("Actions.common#receiveCredits increases the target credits by the amount specified", function() {
    subject().receiveCredits(runner, 2)

    expect(runner.credits).to.equal(3)
  })

  describe("Actions.common#payCredits", function() {
    it ("decreases the target credits by the amount specified", function() {
      subject().payCredits(runner, 1)

      expect(runner.credits).to.equal(0)
    })

    it ("returns false if the amount is higher than the targets credits", function() {

      expect(subject().payCredits(runner, 2)).to.equal(false)
    })
  })

  it ("Module.actions#shiftTurn changes the turn to the other player", function() {
    subject().shiftTurn(game)
    expect(game.turnOwner).to.equal("runner")
    subject().shiftTurn(game)
    expect(game.turnOwner).to.equal("corp")
  })

  it ("Module.actions#trashCard discards a card from somewhere into the player's discard pile", function() {
    subject().trashCard(corp, corp.hand, 2)
    expect(corp.hand).to.not.include(2)
    expect(corp.discard).to.include(2)
  })

  it ("Module.actions#_updateRunner calls an update for the runner", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateRunner(runner)

    expect(spies.call).to.have.been.calledWith('Runner.methods.update', { runnerId: runner._id, newRunner: runner })
  })

  it ("Module.actions#_updateCorp calls an update for the runner", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateCorp(corp)

    expect(spies.call).to.have.been.calledWith('Corp.methods.update', { corpId: corp._id, newCorp: corp })
  })

  it ("Module.actions#_updateGame calls an update for the runner", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateGame(game)

    expect(spies.call).to.have.been.calledWith('Game.methods.update', { gameId: game._id, newGame: game })
  })

})
