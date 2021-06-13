
const ARRAY_LENGTH = 10;
const AVATAR_NUMBER = 10;
const CHECK_LENGTH = 3;
const FEATURES_LENGTH = 6;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const MAX_NUMBER_OF_GUESTS = 21;
const MAX_NUMBER_OF_ROOMS = 7;
const MAX_PRICE_OF_DWELLING = 1000000;
const PHOTOS_LENGTH = 3;
const PROPERTY_LENGTH = 5;
const ROUNDING_FOR_LOCATION = 5;

const arrayProperty = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const arrayCheck = ['12:00', '13:00', '14:00'];
const arrayFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const arrayPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const descriptionProperty = {
  palace: 'Величественный дворец на берегу Тихого океана',
  flat: 'Комфортабельная квартира в спальном районе',
  house: 'Уютный дом на краю леса',
  bungalow: 'Небольшой коттедж на территории отеля',
  hotel: 'Пятизвёздочный отель недалеко от Красного моря',
};

function getRandomPositiveInteger (first, second) {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (first, second, digits) {
  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const makeUniqueRandomIntegerGenerator = (max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomPositiveInteger(1, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(1, max);
    }

    if (currentValue !== AVATAR_NUMBER) {
      currentValue = `0${currentValue}`;
    } else {
      currentValue = '10';
    }

    previousValues.push(Number(currentValue));

    return currentValue;
  };
};

const getUniqueRandomInteger = makeUniqueRandomIntegerGenerator(AVATAR_NUMBER);

const getRandomArray = function (array, quantity) {
  const number = getRandomPositiveInteger (1, quantity);
  const finalArray = [];
  let element;

  for (let index = 0; index < number; index++) {
    element = array[getRandomPositiveInteger (0, quantity - 1)];
    while (finalArray.includes(element)) {
      element = array[getRandomPositiveInteger (0, quantity - 1)];
    }

    finalArray[index] = element;
  }

  return finalArray;
};

const getObject = function () {
  const descr = getRandomPositiveInteger (0, PROPERTY_LENGTH - 1);
  const lat = getRandomPositiveFloat (MIN_LATITUDE, MAX_LATITUDE, ROUNDING_FOR_LOCATION);
  const lng = getRandomPositiveFloat (MIN_LONGITUDE, MAX_LONGITUDE, ROUNDING_FOR_LOCATION);

  return {
    author: {
      avatar: `img/avatars/user${getUniqueRandomInteger()}.png`,
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: 'Сдам жильё',
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger (0, MAX_PRICE_OF_DWELLING),
      type: arrayProperty[descr],
      rooms: getRandomPositiveInteger (1, MAX_NUMBER_OF_ROOMS),
      guests: getRandomPositiveInteger (1, MAX_NUMBER_OF_GUESTS),
      checkin: arrayCheck[getRandomPositiveInteger (0, CHECK_LENGTH - 1)],
      checkout: arrayCheck[getRandomPositiveInteger (0, CHECK_LENGTH - 1)],
      features: getRandomArray(arrayFeatures, FEATURES_LENGTH),
      description: descriptionProperty[arrayProperty[descr]],
      photos: getRandomArray(arrayPhotos, PHOTOS_LENGTH),
    },
  };
};

const getArrayObjects = function() {
  return new Array(ARRAY_LENGTH).fill().map(getObject);
};

console.log ( getArrayObjects() );
