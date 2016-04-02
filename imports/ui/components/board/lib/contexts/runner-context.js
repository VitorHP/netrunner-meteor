import { Mutations } from '../mutations.js'

export const RunnerContext = function (player) {
  return [
    {
      label: "Remove one tag",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {

      }
    },
    {
      label: "Make a Run",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {

      }
    },
  ]
}
