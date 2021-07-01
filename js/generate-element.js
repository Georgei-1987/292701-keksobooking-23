import './data.js';

const noticeTemplate = document.querySelector('#card').content;
const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addPropertyTitle = (element, property) => {
  element.querySelector('.popup__title').textContent = property;

  return element;
};

const addPropertyAddress = (element, property) => {
  element.querySelector('.popup__text--address').textContent = property;

  return element;
};

const addPropertyPrice = (element, property) => {
  element.querySelector('.popup__text--price').textContent = `${property} руб/ночь`;

  return element;
};

const addPropertyType = (element, property) => {
  element.querySelector('.popup__type').textContent = objectType[property];

  return element;
};

const addPropertyCapacity = (element, firstProperty, secondProperty) => {
  element.querySelector('.popup__text--capacity').textContent = `${firstProperty} комнаты для ${secondProperty} гостей`;

  return element;
};

const addPropertyTime = (element, firstProperty, secondProperty) => {
  element.querySelector('.popup__text--time').textContent = `Заезд после ${firstProperty}, выезд до ${secondProperty}`;

  return element;
};

const addPropertyFeature = (element, property) => {
  const featuresList = element.querySelector('.popup__features');
  const featuresElements = element.querySelectorAll('.popup__feature');
  const featureWifi = element.querySelector('.popup__feature--wifi');
  const featureDishwasher = element.querySelector('.popup__feature--dishwasher');
  const featureParking = element.querySelector('.popup__feature--parking');
  const featureWasher = element.querySelector('.popup__feature--washer');
  const featureElevator = element.querySelector('.popup__feature--elevator');
  const featureConditioner = element.querySelector('.popup__feature--conditioner');

  for (const elem of featuresElements) {
    elem.style.display = 'none';
  }

  const featuresArray = property;
  for (const feature of featuresArray) {
    switch (feature) {
      case 'wifi':
        featureWifi.style.display = '';
        featuresList.appendChild(featureWifi);
        break;
      case 'dishwasher':
        featureDishwasher.style.display = '';
        featuresList.appendChild(featureDishwasher);
        break;
      case 'parking':
        featureParking.style.display = '';
        featuresList.appendChild(featureParking);
        break;
      case 'washer':
        featureWasher.style.display = '';
        featuresList.appendChild(featureWasher);
        break;
      case 'elevator':
        featureElevator.style.display = '';
        featuresList.appendChild(featureElevator);
        break;
      case 'conditioner':
        featureConditioner.style.display = '';
        featuresList.appendChild(featureConditioner);
        break;
    }
  }

  return element;
};

const addPropertyDescription = (element, property) => {
  element.querySelector('.popup__description').textContent = property;

  return element;
};

const addPropertyPhoto = (element, property) => {
  const popupPhotos = element.querySelector('.popup__photos');
  const popupPhoto = element.querySelector('.popup__photo');
  popupPhoto.style.display = 'none';
  const arraySources = property;
  for (const src of arraySources) {
    const elem = popupPhoto.cloneNode(true);
    elem.src = src;
    elem.style.display = '';
    popupPhotos.appendChild(elem);
  }

  return element;
};

const addPropertyAvatar = (element, property) => {
  element.querySelector('.popup__avatar').src = property;

  return element;
};

const generateNotice = (notice) => {
  const noticeElement = noticeTemplate.cloneNode(true);

  addPropertyTitle (noticeElement, notice.offer.title);
  addPropertyAddress (noticeElement, notice.offer.address);
  addPropertyPrice (noticeElement, notice.offer.price);
  addPropertyType (noticeElement, notice.offer.type);
  addPropertyCapacity (noticeElement, notice.offer.rooms, notice.offer.guests);
  addPropertyTime (noticeElement, notice.offer.checkin, notice.offer.checkout);
  addPropertyFeature (noticeElement, notice.offer.features);
  addPropertyDescription (noticeElement, notice.offer.description);
  addPropertyPhoto (noticeElement, notice.offer.photos);
  addPropertyAvatar (noticeElement, notice.author.avatar);

  return noticeElement;
};

export {generateNotice};
