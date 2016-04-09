import { Mutations } from '../mutations.js';

export function runnerContext() {
  return [
    {
      label: 'Remove one tag',
      requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {

      },
    },
    {
      label: 'Make a Run',
      requirement() {
        return Mutations.hasClicks(this.player);
      },
      perform() {

      },
    },
  ];
}
