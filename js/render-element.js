import {objectType} from './constants.js';

const addPropertyTitle = (element, property) => {
  const title = element.querySelector('.popup__title');
  if (property) {
    title.textContent = property;
  } else {
    title.style.display = 'none';
  }

  return element;
};

const addPropertyAddress = (element, property) => {
  const address = element.querySelector('.popup__text--address');
  if (property) {
    address.textContent = property;
  } else {
    address.style.display = 'none';
  }

  return element;
};

const addPropertyPrice = (element, property) => {
  const price = element.querySelector('.popup__text--price');
  if (property) {
    price.textContent = `${property} RUB/ночь`;
  } else {
    price.style.display = 'none';
  }

  return element;
};

const addPropertyType = (element, property) => {
  const type = element.querySelector('.popup__type');
  if (property) {
    type.textContent = objectType[property];
  } else {
    type.style.display = 'none';
  }

  return element;
};

const addPropertyCapacity = (element, firstProperty, secondProperty) => {
  const capacity = element.querySelector('.popup__text--capacity');
  if (firstProperty && secondProperty) {
    capacity.textContent = `${firstProperty} комнаты для ${secondProperty} гостей`;
  } else {
    capacity.style.display = 'none';
  }

  return element;
};

const addPropertyTime = (element, firstProperty, secondProperty) => {
  const time = element.querySelector('.popup__text--time');
  if (firstProperty && secondProperty) {
    time.textContent = `Заезд после ${firstProperty}, выезд до ${secondProperty}`;
  } else {
    time.style.display = 'none';
  }

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
  if (property) {
    for (const elem of featuresElements) {
      elem.style.display = 'none';
    }

    for (const feature of property) {
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
  } else {
    featuresList.style.display = 'none';
  }

  return element;
};

const addPropertyDescription = (element, property) => {
  const description = element.querySelector('.popup__description');
  if (property) {
    description.textContent = property;
  } else {
    description.style.display = 'none';
  }

  return element;
};

const addPropertyPhoto = (element, property) => {
  const popupPhotos = element.querySelector('.popup__photos');
  const popupPhoto = element.querySelector('.popup__photo');
  popupPhoto.style.display = 'none';
  if (property) {
    for (const src of property) {
      const elem = popupPhoto.cloneNode(true);
      elem.src = src;
      elem.style.display = '';
      popupPhotos.appendChild(elem);
    }
  } else {
    popupPhotos.style.display = 'none';
  }

  return element;
};

const addPropertyAvatar = (element, property) => {
  const avatar = element.querySelector('.popup__avatar');
  if (property) {
    avatar.src = property;
  } else {
    avatar.style.display = 'none';
  }

  return element;
};

const renderNotice = (notice) => {
  const noticeTemplate = document.querySelector('#card').content.querySelector('.popup');
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

export {renderNotice};
