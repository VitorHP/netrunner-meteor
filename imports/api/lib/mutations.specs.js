import { Spawn }  from "meteor/netrunner:spawn"
import { expect } from 'meteor/practicalmeteor:chai'
import { spies }  from 'meteor/practicalmeteor:sinon'
import { N } from './n.js'
import '/imports/tests/support/spawns.js'

import { Mutations } from "./mutations.js"

describe.only("Mutations", function() {
  var runner, game, corp, card;

  beforeEach(function() {
    runner = Spawn.create("Runner")
    corp = Spawn.create("Corp")
    game = Spawn.create("Game")
    card = Spawn.create("Card")
  })

  function subject() {
    return Mutations
  }

  it ("Mutations#isRunner reduces the target clicks by the amount specified", function() {
    expect(subject().isRunner(runner)).to.equal(true)
  })

  it ("Mutations#click reduces the target clicks by the amount specified", function() {
    expect(subject().click(2, runner).clicks).to.equal(0)
  })

  it ("Mutations#hasClicks returns true if the target clicks > 0", function() {
    runner = Spawn.create("Runner", { clicks: 1 })

    expect(subject().hasClicks(runner)).to.equal(true)
  })

  it ("Mutations#fillClicks fills the player clicks to its maximum", function() {
    runner = Spawn.create("Runner", { clicks: 0 })

    expect(subject().fillClicks(runner).clicks).to.equal(4)
  })

  it ("Mutations#isAboveHandLimit returns true if the player has more cards in its hand than the limit", function() {
    runner = Spawn.create("Runner", { hand: [1, 2, 3, 4, 5, 6], max_hand_size: 5 })

    expect(subject().isAboveHandLimit(runner)).to.equal(true)
  })

  it ("Mutations#drawCard removes a card from the deck and places it on the runner's hand", function() {
    expect(subject().drawCard(2, runner).hand.length).to.equal(2)
  })

  it ("Mutations#drawCard removes [count] cards from the deck and places it on the runner's hand when [count is specified]", function() {
    expect(subject().drawCard(2, runner).deck_cards.length).to.equal(0)
  })

  it ("Mutations#trashFromHand discards a card from somewhere into the player's discard pile", function() {
    corp = Spawn.create("Corp", { hand: ["01003"] })

    expect(subject().trashFromHand(corp, "01003").hand).to.not.include("01003")
  })

  it ("Mutations#hasCredits checks wether the player has the amount of credits specified", function() {
    expect(subject().hasCredits(2, runner)).to.equal(false)
  })

  it ("Mutations#receiveCredits increases the target credits by the amount specified", function() {
    expect(subject().receiveCredits(2, runner).credits).to.equal(3)
  })

  describe("Mutations#payCredits", function() {
    it ("decreases the target credits by the amount specified", function() {
      runner = Spawn.create("Runner", { credits: 2 })

      expect(subject().payCredits(2, runner).credits).to.equal(0)
    })
  })

  it ("Mutations#ready sets the player as ready", function() {
    corp = Spawn.create("Corp", { ready: false })

    expect(subject().ready(corp).ready).to.eq(true)
  })

  it ("Mutations#isReady returns true if the player is ready", function() {
    corp = Spawn.create("Corp", { ready: true })
    expect(subject().isReady(corp)).to.eq(true)

    corp = undefined
    expect(subject().isReady(corp)).to.eq(false)
  })

  it ("Mutations#acceptMulligan sets the player mulligan", function() {
    corp = Spawn.create("Corp", { mulligan: false })

    expect(subject().acceptMulligan(true, corp).mulligan).to.eq(true)
  })

  it ("Mutations#didMulligan returns true if the player accepted a mulligan", function() {
    corp = Spawn.create("Corp", { mulligan: false })
    expect(subject().didMulligan(corp)).to.eq(true)

    corp = undefined
    expect(subject().didMulligan(corp)).to.eq(false)
  })

  it ("Mutations#removeCards removes a card from a player's collections", function(){
    player = Spawn.create("Runner", { hand: ['01001'], deck_cards: [] })

    player = subject().removeCards('hand', ['01001'], player)

    expect(player.hand).not.to.include('01001')
  })

  it ("Mutations#moveCards moves a card between a player's collections", function(){
    player = Spawn.create("Runner", { hand: ['01001'], deck_cards: [] })

    player = subject().moveCards('hand', 'deckCards', ['01001'], player)

    expect(player.deck_cards).to.include('01001')
  })

  it ("Mutations#removeFromHand removes a card from the player's hand", function(){
    let cardDouble = { code: "01002" }

    expect(corp.hand).to.include("01002")

    corp = subject().removeFromHand(['01002'], corp)

    expect(corp.hand).to.not.include("01002")
  })

  it ("Mutations#returnToDeck returns the passed card to the player's deck", function() {
    let runner = Spawn.create("Runner", { hand: [1, 2], deck_cards: [3] })

    expect(subject().returnToDeck(runner.hand, runner).deck_cards).to.deep.equal([1, 2, 3])
    expect(subject().returnToDeck(runner.hand, runner).hand).to.deep.equal([])
  })

  // Game

  it ("Mutations#shiftTurn changes the turn to the other player", function() {
    game = Spawn.create("Game", { turn_owner: "corp" })
    expect(subject().shiftTurn(game).turn_owner).to.equal("runner")

    game = Spawn.create("Game", { turn_owner: "runner" })
    expect(subject().shiftTurn(game).turn_owner).to.equal("corp")

    game = Spawn.create("Game", { turn_owner: undefined })
    expect(subject().shiftTurn(game).turn_owner).to.equal("corp")
  })

  it ("Mutations#newTurn increases turn counter", function(){
    game = Spawn.create("Game", { turn: 2 })
    expect(subject().newTurn(game).turn).to.equal(3)
  })

  it ("Mutations#isTurnOwner returns true if is the turned owner", function() {
    game = Spawn.create("Game", { turn_owner: "runner" })
    corp = Spawn.create("Corp")
    expect(subject().isTurnOwner(corp, game)).to.equal(false)

    game = Spawn.create("Game", { turn_owner: "corp" })
    corp = Spawn.create("Corp")
    expect(subject().isTurnOwner(corp, game)).to.equal(true)
  })

  it ("Mutations#gameStarted returns true if turn is bigger than zero", function() {
    game = Spawn.create("Game", { turn: 0 })
    expect(subject().gameStarted(game)).to.equal(false)
  })

  // Deck

  it ("Mutations#shuffleDeck shuffles the player deck", function() {
    stubs.create('shuffle', N, 'shuffle')

    subject().shuffleDeck(runner)

    expect(stubs.shuffle).to.have.been.calledWith(runner.deck_cards)
  })

  // Cards

  it ("Mutations#isOfType returns true if card.type_code is of one of the types specified", function() {
    expect(subject().isOfType(card, "identity")).to.equal(true)
    expect(subject().isOfType(card, ["identity", "program"])).to.equal(true)
  })

  it ("Mutations#isCorpCard returns true if it's a corp card", function(){
    let cardDouble = { code: 2, side_code: "corp" }

    expect(subject().isCorpCard(cardDouble)).to.eql(true)
  })

  it ("Mutations#isRunnerCard returns true if it's a runner card", function(){
    let cardDouble = { code: 2, side_code: "runner" }

    expect(subject().isRunnerCard(cardDouble)).to.eql(true)
  })

  describe ("methods which call meteor Methods", function(){

    beforeEach(function(){
      stubs.create('call', Meteor, 'call')
    })

    afterEach(function(){
      stubs.restoreAll()
    })

    it ("Mutations#_updateRunner calls an update for the runner", function() {
      subject()._updateRunner(runner)

      expect(stubs.call).to.have.been.calledWith('Runner.methods.update', { runner_id: runner._id, newRunner: runner })
    })

    it ("Mutations#_updateCorp calls an update for the runner", function() {
      subject()._updateCorp(corp)

      expect(stubs.call).to.have.been.calledWith('Corp.methods.update', { corp_id: corp._id, newCorp: corp })
    })

    it ("Mutations#_updateGame calls an update for the game", function() {
      subject()._updateGame(game)

      expect(stubs.call).to.have.been.calledWith('Game.methods.update', { gameId: game._id, newGame: game })
    })

  })

  describe("Mutations#installCard", function(){
    it("installs a program in the runner's program area", function(){
      let cardDouble = { code: "01042", type_code: "program" }

      expect(subject().installCard(cardDouble, {}, runner).programs[0].card_code).to.eq("01042")
    })

    it ("installs a hardware in the runner's hardware area", function(){
      let cardDouble = { code: "01042", type_code: "hardware" }

      expect(subject().installCard(cardDouble, {}, runner).hardware[0].card_code).to.eq("01042")
    })

    it ("installs a resource in the runner's resource area", function(){
      let cardDouble = { code: "01042", type_code: "resource" }

      expect(subject().installCard(cardDouble, {}, runner).resources[0].card_code).to.eq("01042")
    })

    it ("installs a rezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remote_servers.length).to.eq(0)

      let res = subject().installCard(cardDouble, { rezzed: true, server_id: 0 }, corp)

      expect(res.remote_servers.length).to.eq(1)
      expect(res.remote_servers[0].cards[0].card_code).to.eq("01042")
      expect(res.remote_servers[0].cards[0].rezzed).to.eq(true)
    })

    it ("installs a unrezzed agenda on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remote_servers.length).to.eq(0)

      let res = subject().installCard(cardDouble, { rezzed: false, server_id: 0 }, corp)

      expect(res.remote_servers.length).to.eq(1)
      expect(res.remote_servers[0].cards[0].card_code).to.eq("01042")
      expect(res.remote_servers[0].cards[0].rezzed).to.eq(false)
    })

    it ("installs an ice on a corp's existing remote server", function(){
      let corp = Spawn.create("Corp", { remote_servers: [{ server_id: 0, cards: [], ices: [] }] })
      let cardDouble = { code: "01042", type_code: "agenda" }

      expect(corp.remote_servers.length).to.eq(1)

      let res = subject().installCard(cardDouble, { rezzed: true, server_id: 0 }, corp)

      expect(res.remote_servers.length).to.eq(1)
      expect(res.remote_servers[0].cards.length).to.eq(1)
    })

    it ("installs an ice on a corp's new remote server", function(){
      let cardDouble = { code: "01042", type_code: "ice" }

      let res = subject().installCard(cardDouble, { rezzed: true, server_id: 0 }, corp)

      expect(res.remote_servers[0].ices.length).to.eq(1)
      expect(res.remote_servers[0].ices[0].card_code).to.eq("01042")
    })
  })


})
