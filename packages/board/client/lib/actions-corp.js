Actions.corp = function (player) {
  return [
    {
      label: "Play an operation",
      perform() {
        Modals.revealModal(this.corp.handCards(), 1)
      }
    },
    {
      label: "Advance a card",
      perform() {

      }
    },
    {
      label: "Trash Runner's Resource",
      perform() {

      }
    },
    {
      label: "Purge Virus",
      perform() {

      }
    },
  ]
}
