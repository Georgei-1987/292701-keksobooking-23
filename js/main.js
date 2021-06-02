// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Пример использования функции:

// имя_функции(от, до); // Результат: целое число из диапазона "от...до"

// Учтите, что диапазон может быть только положительный, включая ноль.
// А также придумайте, как функция должна вести себя, если передать значение «до» меньшее,
// чем значение «от», или равное ему.

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  if (min <0 || max < 0 || min >= max) {
    alert('В диапазоне указаны неверные числа.\nВведите пожалуйста правильные числа.');
    return '';
  }
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
console.log(getRandomIntInclusive(1, 10));


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Будет использоваться для генерации временных географических координат в следующем задании.
// Пример использования функции:

// имя_функции(от, до, количество_знаков_после_запятой);
// Результат: число с плавающей точкой из диапазона "от...до" с указанным
// "количеством знаков после запятой"

// Учтите, что диапазон может быть только положительный, включая ноль.
// А также придумайте, как функция должна вести себя, если передать значение «до» меньшее,
// чем значение «от», или равное ему. Не забудьте, что в случае с дробными числами диапазон
// может быть в десятых, сотых, тысячных и т. д. долях.
// Например, 1.1, 1.2 — корректный диапазон.

// https://question-it.com/questions/1483098/generatsija-sluchajnogo-chisla-mezhdu-dvumja-chislami-v-javascript

function randomFloatFromInterval (min, max, fractionDigits) {
  if (min < 0 || max < 0 || min >= max || fractionDigits <= 0) {
    alert('В диапазоне указаны неверные числа.\nВведите пожалуйста правильные числа.');
    return '';
  }
  const fractionMultiplier = Math.pow(10, fractionDigits)
  return Math.round((Math.random() * (max - min) + min) * fractionMultiplier) / fractionMultiplier;
}
console.log(randomFloatFromInterval(1, 10, 1));
