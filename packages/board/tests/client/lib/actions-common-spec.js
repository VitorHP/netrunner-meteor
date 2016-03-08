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
      "identityCardCode" : 1,
      "programs" : [],
      "hardware" : [],
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
      "identityCardCode" : 1,
      "remoteServers" : []
    }
    game = {
      "_id" : "7MGuiovynhY2TgsbJ",
      "runnerId" : "7MGuiovynhY2TgsbJ",
      "corpId" : "7MGuiovynhY2TgsbJ",
      "turnOwner" : "corp"
    }
    card = {
      "_id" : "3gRNkaG99J5goYjKD",
      "title" : "Noise - Hacker Extraordinaire",
      "side" : "Runner",
      "side_code" : "runner",
      "faction" : "Criminal",
      "faction_code" : "Criminal",
      "imgSrc" : "images/cards/core/bc0f047c-01b1-427f-a439-d451eda01001.jpg",
      "code" : 1,
      "type_code" : "identity"
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

  it ("Actions.common#shiftTurn changes the turn to the other player", function() {
    subject().shiftTurn(game)
    expect(game.turnOwner).to.equal("runner")
    subject().shiftTurn(game)
    expect(game.turnOwner).to.equal("corp")
  })

  it ("Actions.common#trashCard discards a card from somewhere into the player's discard pile", function() {
    subject().trashCard(corp, corp.hand, 2)
    expect(corp.hand).to.not.include(2)
    expect(corp.discard).to.include(2)
  })

  it ("Actions.common#_updateRunner calls an update for the runner", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateRunner(runner)

    expect(spies.call).to.have.been.calledWith('Runner.methods.update', { runnerId: runner._id, newRunner: runner })
  })

  it ("Actions.common#_updateCorp calls an update for the runner", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateCorp(corp)

    expect(spies.call).to.have.been.calledWith('Corp.methods.update', { corpId: corp._id, newCorp: corp })
  })

  it ("Actions.common#_updateGame calls an update for the game", function() {
    spies.create('call', Meteor, 'call')

    subject()._updateGame(game)

    expect(spies.call).to.have.been.calledWith('Game.methods.update', { gameId: game._id, newGame: game })
  })

  it ("Actions.common#isOfType returns true if card.type_code is of one of the types specified", function() {
    expect(subject().isOfType(card, "identity")).to.equal(true)
    expect(subject().isOfType(card, ["identity", "program"])).to.equal(true)
  })

  describe("Actions.common#installCard", function(){
    it ("installs a program in the runner's program area", function(){
      let cardDouble = { code: 42, type_code: "program" }

      subject().installCard(runner, cardDouble)

      expect(runner.programs[0].cardCode).to.eq(42)
    })

    it ("installs a hardware in the runner's hardware area", function(){
      let cardDouble = { code: 42, type_code: "hardware" }

      subject().installCard(runner, cardDouble)

      expect(runner.hardware[0].cardCode).to.eq(42)
    })

    it ("installs a resource in the runner's resource area", function(){
      let cardDouble = { code: 42, type_code: "resource" }

      subject().installCard(runner, cardDouble)

      expect(runner.resources[0].cardCode).to.eq(42)
    })

    it ("installs a rezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: 42, type_code: "agenda" }

      expect(corp.remoteServers.length).to.eq(0)

      subject().installCard(corp, cardDouble, { rezzed: true, serverId: "new-server" })

      expect(corp.remoteServers.length).to.eq(1)
      expect(corp.remoteServers[0].cards[0].cardCode).to.eq(42)
      expect(corp.remoteServers[0].cards[0].rezzed).to.eq(true)
    })

    it ("installs a unrezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: 42, type_code: "agenda" }

      expect(corp.remoteServers.length).to.eq(0)

      subject().installCard(corp, cardDouble, { rezzed: false, serverId: "new-server" })

      expect(corp.remoteServers.length).to.eq(1)
      expect(corp.remoteServers[0].cards[0].cardCode).to.eq(42)
      expect(corp.remoteServers[0].cards[0].rezzed).to.eq(false)
    })

    it ("installs a card on a corp's existing remote server", function(){
      let cardDouble = { code: 42, type_code: "agenda" }

      subject().installCard(corp, cardDouble, { rezzed: false, serverId: "new-server" })

      expect(corp.remoteServers.length).to.eq(1)

      subject().installCard(corp, cardDouble, { rezzed: false, serverId: 0 })

      expect(corp.remoteServers.length).to.eq(1)
      expect(corp.remoteServers[0].cards.length).to.eq(2)
    })

    it ("installs a card on a corp's new remote server", function(){
      let cardDouble = { code: 42, type_code: "ice" }

      subject().installCard(corp, cardDouble, { rezzed: false, serverId: "new-server" })

      expect(corp.remoteServers[0].ices.length).to.eq(1)
      expect(corp.remoteServers[0].ices[0].cardCode).to.eq(42)
    })
  })

  it ("Actions.common#removeFromHand removes a card from the player's hand", function(){
    let cardDouble = { code: 2 }

    expect(corp.hand).to.include(2)

    subject().removeFromHand(corp, cardDouble)

    expect(corp.hand).to.not.include(2)
  })

  it ("Actions.common#isCorpCard returns true if it's a corp card", function(){
    let cardDouble = { code: 2, side_code: "corp" }

    expect(subject().isCorpCard(cardDouble)).to.eql(true)
  })

  it ("Actions.common#isRunnerCard returns true if it's a runner card", function(){
    let cardDouble = { code: 2, side_code: "runner" }

    expect(subject().isRunnerCard(cardDouble)).to.eql(true)
  })
})
