import './data.js';
// import {getArrayObjects} from './data.js';

const noticeTemplate = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');

const generateNotice = (notice) => {
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
  const featuresList = noticeElement.querySelector('.popup__features');
  const featuresElements = noticeElement.querySelectorAll('.popup__feature');
  for (let element of featuresElements) {
    element.style.display = 'none';
  }

  const featuresArray = notice.offer.features;
  for (let feature of featuresArray) {
    switch (feature) {
      case 'wifi':
        noticeElement.querySelector('.popup__feature--wifi').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--wifi'));
        break;
      case 'dishwasher':
        noticeElement.querySelector('.popup__feature--dishwasher').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--dishwasher'));
        break;
      case 'parking':
        noticeElement.querySelector('.popup__feature--parking').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--parking'));
        break;
      case 'washer':
        noticeElement.querySelector('.popup__feature--washer').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--washer'));
        break;
      case 'elevator':
        noticeElement.querySelector('.popup__feature--elevator').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--elevator'));
        break;
      case 'conditioner':
        noticeElement.querySelector('.popup__feature--conditioner').style.display = '';
        featuresList.appendChild(noticeElement.querySelector('.popup__feature--conditioner'));
        break;
    }
  }

  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
  const popupPhotos = noticeElement.querySelector('.popup__photos');
  const popupPhoto = noticeElement.querySelector('.popup__photo');
  popupPhoto.style.display = 'none';
  const arraySources = notice.offer.photos;
  for (let src of arraySources) {
    const element = popupPhoto.cloneNode(true);
    element.src = src;
    element.style.display = '';
    popupPhotos.appendChild(element);
  }

  noticeElement.querySelector('.popup__avatar').textContent = notice.offer.description;

  mapCanvas.appendChild(noticeElement);
};

export {generateNotice};
