Actions.hand = function() {
  return [
    {
      label: "Install",
      requirementParams: ["player", "card"],
      requirement(player, card) {
        return Actions.common.isOfType(card, ["agenda", "program"])
      },
      performParams: ["player", "card"],
      perform(player, card) {
        Actions.common.removeFromHand(player, card)
        Actions.common.installCard(player, card)
        Actions.common._updatePlayer(player)
      }
    }
  ]
}
