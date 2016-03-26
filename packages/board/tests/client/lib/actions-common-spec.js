describe("Actions.common", function() {
  var runner, game, corp;

  beforeEach(function() {
    runner = Spawn.create("Runner")
    corp = Spawn.create("Corp")
    game = Spawn.create("Game")
    card = Spawn.create("Card")
  })

  subject = function() {
    return Actions.common
  }

  it ("Actions.common#click reduces the target clicks by the amount specified", function() {
    expect(subject().click(2, runner).clicks).to.equal(0)
  })

  it ("Actions.common#hasClicks returns true if the target clicks > 0", function() {
    runner = Spawn.create("Runner", { clicks: 1 })

    expect(subject().hasClicks(runner)).to.equal(true)
  })

  it ("Actions.common#drawCard removes a card from the deck and places it on the runner's hand", function() {
    expect(subject().drawCard(2, runner).hand.length).to.equal(2)
  })

  it ("Actions.common#drawCard removes [count] cards from the deck and places it on the runner's hand when [count is specified]", function() {
    expect(subject().drawCard(2, runner).deckCards.length).to.equal(0)
  })

  it ("Actions.common#trashFromHand discards a card from somewhere into the player's discard pile", function() {
    corp = Spawn.create("Corp", { hand: ["01003"] })

    expect(subject().trashFromHand(corp, "01003").hand).to.not.include("01003")
  })

  it ("Actions.common#receiveCredits increases the target credits by the amount specified", function() {
    expect(subject().receiveCredits(2, runner).credits).to.equal(3)
  })

  describe("Actions.common#payCredits", function() {
    it ("decreases the target credits by the amount specified", function() {
      runner = Spawn.create("Runner", { credits: 2 })

      expect(subject().payCredits(2, runner).credits).to.equal(0)
    })
  })

  it ("Actions.common#returnToDeck returns the passed card to the player's deck", function() {
    let cards = ["02001"]

    expect(subject().returnToDeck(cards, runner).deckCards).to.include("02001")
  })

  it ("Actions.common#ready sets the player as ready", function() {
    corp = Spawn.create("Corp", { ready: false })

    expect(subject().ready(corp).ready).to.eq(true)
  })

  it ("Actions.common#isReady returns true if the player is ready", function() {
    corp = Spawn.create("Corp", { ready: true })
    expect(subject().isReady(corp)).to.eq(true)

    corp = undefined
    expect(subject().isReady(corp)).to.eq(false)
  })

  it ("Actions.common#acceptMulligan sets the player mulligan", function() {
    corp = Spawn.create("Corp", { mulligan: false })

    expect(subject().acceptMulligan(true, corp).mulligan).to.eq(true)
  })

  it ("Actions.common#didMulligan returns true if the player accepted a mulligan", function() {
    corp = Spawn.create("Corp", { mulligan: false })
    expect(subject().didMulligan(corp)).to.eq(true)

    corp = undefined
    expect(subject().didMulligan(corp)).to.eq(false)
  })

  it ("Actions.common#removeFromHand removes a card from the player's hand", function(){
    let cardDouble = { code: "01002" }

    expect(corp.hand).to.include("01002")

    subject().removeFromHand(corp, cardDouble)

    expect(corp.hand).to.not.include("01002")
  })

  // Game

  it ("Actions.common#shiftTurn changes the turn to the other player", function() {
    game = Spawn.create("Game", { turnOwner: "corp" })
    expect(subject().shiftTurn(game).turnOwner).to.equal("runner")

    game = Spawn.create("Game", { turnOwner: "runner" })
    expect(subject().shiftTurn(game).turnOwner).to.equal("corp")

    game = Spawn.create("Game", { turnOwner: undefined })
    expect(subject().shiftTurn(game).turnOwner).to.equal("corp")
  })

  it ("Actions.common#isTurnOwner returns true if is the turned owner", function() {
    game = Spawn.create("Game", { turnOwner: "runner" })
    expect(subject().isTurnOwner("runner", game)).to.equal(true)

    game = Spawn.create("Game", { turnOwner: "corp" })
    expect(subject().isTurnOwner("corp", game)).to.equal(true)
  })

  // Deck

  it ("Actions.common#shuffleDeck shuffles the player deck", function() {
    spies.create('shuffle', _, 'shuffle')

    subject().shuffleDeck(runner)

    expect(spies.shuffle).to.have.been.calledWith()
  })

  // Cards

  it ("Actions.common#isOfType returns true if card.type_code is of one of the types specified", function() {
    expect(subject().isOfType(card, "identity")).to.equal(true)
    expect(subject().isOfType(card, ["identity", "program"])).to.equal(true)
  })

  it ("Actions.common#isCorpCard returns true if it's a corp card", function(){
    let cardDouble = { code: 2, side_code: "corp" }

    expect(subject().isCorpCard(cardDouble)).to.eql(true)
  })

  it ("Actions.common#isRunnerCard returns true if it's a runner card", function(){
    let cardDouble = { code: 2, side_code: "runner" }

    expect(subject().isRunnerCard(cardDouble)).to.eql(true)
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

  describe("Actions.common#installCard", function(){
    it ("installs a program in the runner's program area", function(){
      let cardDouble = { code: "01042", type_code: "program" }

      expect(subject().installCard(runner, cardDouble).programs[0].cardCode).to.eq("01042")
    })

    it ("installs a hardware in the runner's hardware area", function(){
      let cardDouble = { code: "01042", type_code: "hardware" }

      expect(subject().installCard(runner, cardDouble).hardware[0].cardCode).to.eq("01042")
    })

    it ("installs a resource in the runner's resource area", function(){
      let cardDouble = { code: "01042", type_code: "resource" }

      expect(subject().installCard(runner, cardDouble).resources[0].cardCode).to.eq("01042")
    })

    it ("installs a rezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remoteServers.length).to.eq(0)

      let res = subject().installCard(corp, cardDouble, { rezzed: true, serverId: 0 })

      expect(res.remoteServers.length).to.eq(1)
      expect(res.remoteServers[0].cards[0].cardCode).to.eq("01042")
      expect(res.remoteServers[0].cards[0].rezzed).to.eq(true)
    })

    it ("installs a unrezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remoteServers.length).to.eq(0)

      let res = subject().installCard(corp, cardDouble, { rezzed: false, serverId: 0 })

      expect(res.remoteServers.length).to.eq(1)
      expect(res.remoteServers[0].cards[0].cardCode).to.eq("01042")
      expect(res.remoteServers[0].cards[0].rezzed).to.eq(false)
    })

    it ("installs an ice on a corp's existing remote server", function(){
      let corp = Spawn.create("Corp", { remoteServers: [{ serverId: 0, cards: [], ices: [] }] })
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remoteServers.length).to.eq(1)

      let res = subject().installCard(corp, cardDouble, { rezzed: true, serverId: 0 })

      expect(res.remoteServers.length).to.eq(1)
      expect(res.remoteServers[0].cards.length).to.eq(1)
    })

    it ("installs an ice on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "ice" }

      let res = subject().installCard(corp, cardDouble, { rezzed: true, serverId: 0 })

      expect(res.remoteServers[0].ices.length).to.eq(1)
      expect(res.remoteServers[0].ices[0].cardCode).to.eq("01042")
    })
  })


})
