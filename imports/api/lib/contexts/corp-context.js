import { Mutations } from '../mutations.js';

export function corpContext() {
  return [
    {
      label: "Trash Runner's Resource",
      requirement: function requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {

      },
    },
    {
      label: 'Purge Virus',
      requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {

      },
    },
  ];
}
