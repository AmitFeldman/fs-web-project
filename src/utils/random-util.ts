const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomColor = () =>
  `hsl(${getRandomInt(0, 360)},${getRandomInt(42, 98)}%,${getRandomInt(
    40,
    90
  )}%)`;

export {getRandomInt, getRandomColor};
