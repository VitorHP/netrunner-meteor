Actions.corp = function (player) {
  return [
    {
      label: "Trash Runner's Resource",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {

      }
    },
    {
      label: "Purge Virus",
      requirement: function() {
        return Actions.common.hasClicks(this.player)
      },
      perform() {

      }
    },
  ]
}
