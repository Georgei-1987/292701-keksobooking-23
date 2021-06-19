const getRandomPositiveInteger = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomPositiveFloat = (first, second, digits) => {
  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

// export function getRandomPositiveInteger (first, second) {
//   const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
//   const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
//   const result = Math.random() * (upper - lower + 1) + lower;

//   return Math.floor(result);
// }

// export function getRandomPositiveFloat (first, second, digits) {
//   const lower = Math.min(Math.abs(first), Math.abs(second));
//   const upper = Math.max(Math.abs(first), Math.abs(second));
//   const result = Math.random() * (upper - lower) + lower;

//   return result.toFixed(digits);
// }

export {getRandomPositiveInteger};
export {getRandomPositiveFloat};
