describe("Modules.actions", function() {
  var target;

  beforeEach(function() {
    target = {
      "deckId" : "sfHfp6WobMieubfYZ",
      "backgroundImgSrc" : "images/cards/background.png",
      "clicks" : 2,
      "credits" : 0,
      "deckCards" : [2, 3],
      "heap" : [],
      "hand" : [],
      "identityCardId" : 1,
      "programs" : [],
      "hardwares" : [],
      "resources" : []
    }
  })

  subject = function() {
    return Modules.actions
  }

  describe("Modules.actions#drawCard", function() {
    it ("Removes a card from the deck and places it on the runner's hand", function() {
      subject().drawCard(target)

      expect(target.deckCards.length).to.equal(1)
    })

    it ("It costs the player a click", function() {
      subject().drawCard(target)

      expect(target.clicks).to.equal(1)
    })
  })
})
