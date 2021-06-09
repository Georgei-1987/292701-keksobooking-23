const massiveObjects = [];
const massiveProperty = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const massiveCheck = ['12:00', '13:00', '14:00'];
const massiveFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const massivePhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
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

const createImgAddress = function () {
  const random =  getRandomPositiveInteger(1, 10);
  if (random !== 10) {
    return 'img/avatars/user0' + random + '.png';
  }
  return 'img/avatars/user10.png';
};

const createRandomMassive = function (massive, quantity) {
  const number = getRandomPositiveInteger (1, quantity);
  const finalMassive = [];
  let element;
  for (let index = 0; index < number; index++) {
    element = massive[getRandomPositiveInteger (0, quantity - 1)];
    while (finalMassive.includes(element)) {
      element = massive[getRandomPositiveInteger (0, quantity - 1)];
    }

    finalMassive[index] = element;
  }

  return finalMassive;
};

const createObject = function () {
  const object = {
    author: {
      avatar: 'null',
    },
    offer: {
      title: 'Сдам жильё',
      address: 'null',
      price: 'null',
      type: 'null',
      rooms: 'null',
      guests: 'null',
      checkin: 'null',
      checkout: 'null',
      features: 'null',
      description: 'null',
      photos: 'null',
    },
    location: {
      lat: 'null',
      lng: 'null',
    },
  };


  object.author.avatar = createImgAddress();
  object.offer.address = getRandomPositiveInteger (0, 90) + ', ' + getRandomPositiveInteger (0, 180);
  object.offer.price = getRandomPositiveInteger (0, 1000000);
  object.offer.type = massiveProperty[getRandomPositiveInteger (0, 4)];
  object.offer.rooms = getRandomPositiveInteger (1, 7);
  object.offer.guests = getRandomPositiveInteger (1, 21);
  object.offer.checkin = massiveCheck[getRandomPositiveInteger (0, 2)];
  object.offer.checkout = massiveCheck[getRandomPositiveInteger (0, 2)];
  object.offer.features = createRandomMassive(massiveFeatures, 6);
  object.offer.description = descriptionProperty[object.offer.type];
  object.offer.photos = createRandomMassive(massivePhotos, 3);
  object.location.lat = getRandomPositiveFloat (35.65, 35.7, 2);
  object.location.lng = getRandomPositiveFloat (139.7, 139.8, 1);

  return object;
};

for (let i = 0; i < 10; i++) {
  massiveObjects[i] = createObject();
}
