import {getArrayObjects} from './data.js';
import './generate-element.js';


// const arrayObjects = getArrayObjects();

const noticeTemplate = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');

// const popupTitle = noticeTemplate.querySelector('.popup__title');
// const popupAddress = noticeTemplate.querySelector('.popup__text--address');
// const popupPrice = noticeTemplate.querySelector('.popup__text--price');

const arrayNotices = getArrayObjects();

arrayNotices.forEach( (notice) => {
  const noticeElement = noticeTemplate.cloneNode(true);
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = `${notice.offer.price} руб/ночь`;
  switch (notice.offer.type) {
    case 'flat':
      noticeElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      noticeElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      noticeElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      noticeElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      noticeElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }
  noticeElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
  noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
  // const featuresList = noticeElement.querySelector('.popup__features');
  // // ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  // notice.offer.features.forEach( (feature) => {
  //   switch (feature) {
  //     case 'wifi':
  //       featuresList.appendChild(noticeElement.querySelector('.popup__feature--wifi'));
  //       break;
  //   }
  // });

  mapCanvas.appendChild(noticeElement);
});

// console.log(popupTitle);
// noticeElement.querySelector('.popup__title').classList.add('hidden');
