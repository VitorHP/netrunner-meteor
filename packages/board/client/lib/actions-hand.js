Actions.hand = function() {
  return [
    {
      label: "Install",
      requirement() {
        return Actions.common.isOfType(this.card, ["agenda", "program"])
      },
      perform() {
        Actions.common.removeFromHand(this.player, this.card)
        Actions.common.installCard(this.player, this.card)
        Actions.common._updatePlayer(this.player)
      }
    }
  ]
}
