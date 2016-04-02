import { Mutations } from '../mutations.js'

export const CorpContext = function (player) {
  return [
    {
      label: "Trash Runner's Resource",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {

      }
    },
    {
      label: "Purge Virus",
      requirement: function() {
        return Mutations.hasClicks(this.player)
      },
      perform() {

      }
    },
  ]
}
