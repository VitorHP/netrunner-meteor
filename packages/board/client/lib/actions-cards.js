Actions.cards = function(card){
  return [
    {
      label: "Install",
      requirement() {
        return Actions.common.isOfType(card, ["agenda", "program"])
      },
      perform() {

      }
    },
    {
      label: "Play",
      requirement() {
        return Actions.common.isOfType(card, ["operation", "event"])
      },
      perform() {

      }
    },
    {
      label: "Trash",
      requirement() {
        return !Actions.common.isOfType(card, "identity")
      },
      perform() {

      }
    },
    {
      label: "Advance",
      requirement() {
        return Actions.common.isOfType(card, "agenda")
      },
      perform(){

      }
    },
    {
      label: "Activate",
      perform(){

      }
    },
    {
      label: "Rezz",
      requirement() {
        return Actions.common.isCorpCard(card)
      },
      perform() {

      }
    }
  ]
}
