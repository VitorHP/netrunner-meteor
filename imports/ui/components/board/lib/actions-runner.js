Actions.runner = function (player) {
  return [
    {
      label: "Remove one tag",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {

      }
    },
    {
      label: "Make a Run",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {

      }
    },
  ]
}
