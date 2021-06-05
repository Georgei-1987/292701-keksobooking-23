
//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/**
 * Возвращает случайное число из указанного диапазона (min и max входят в диапазон).
 *
 * @param {number} min Нижний предел.
 * @param {number} max Верхний предел.
 */

function getRandomIntInclusive(min, max) {
  if (min <0 || max < 0 || min >= max) {

    return null;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(2, 10);

//Источник: https://question-it.com/questions/1483098/generatsija-sluchajnogo-chisla-mezhdu-dvumja-chislami-v-javascript

/**
 * Возвращает случайное число с плавающей точкой с "указанным количеством знаков после запятой"
 * (min и max входят в диапазон).
 *
 * @param {number} min Нижний предел.
 * @param {number} max Верхний предел.
 */

function getRandomFloatInclusive(min, max, fractionDigits) {
  if (min < 0 || max < 0 || min >= max || fractionDigits <= 0) {

    return null;
  }

  const fractionMultiplier = Math.pow(10, fractionDigits);

  return Math.round((Math.random() * (max - min) + min) * fractionMultiplier) / fractionMultiplier;
}

getRandomFloatInclusive(1, 10, 1);
