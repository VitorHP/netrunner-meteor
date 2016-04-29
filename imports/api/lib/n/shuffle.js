export function shuffle(array) {
  const ar = array;
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = ar[currentIndex];
    ar[currentIndex] = ar[randomIndex];
    ar[randomIndex] = temporaryValue;
  }

  return ar;
}
