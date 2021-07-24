const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addProperty = (element, field, property) => {
  if (property) {
    field.textContent = property;
  } else {
    field.style.display = 'none';
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

const addPropertyFeature = (element, array) => {
  const featuresList = element.querySelector('.popup__features');
  const featuresElements = element.querySelectorAll('.popup__feature');

  const displayElementFeature = (nameElement) => {
    nameElement.style.display = '';
    featuresList.appendChild(nameElement);
  };

  const displayOff = (elem) => {
    elem.style.display = 'none';
  };

  if (array) {
    for (const elem of featuresElements) {
      displayOff(elem);
    }

    for (const feature of array) {
      if (array.includes(feature)) {
        displayElementFeature(element.querySelector(`.popup__feature--${feature}`));
      }
    }
  } else {
    displayOff(featuresList);
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
  const noticeTemplate = document
    .querySelector('#card')
    .content
    .querySelector('.popup');
  const noticeElement = noticeTemplate.cloneNode(true);
  const address = noticeElement.querySelector('.popup__text--address');
  const description = noticeElement.querySelector('.popup__description');
  const title = noticeElement.querySelector('.popup__title');

  addProperty(noticeElement, title, notice.offer.title);
  addProperty(noticeElement, address, notice.offer.address);
  addPropertyPrice (noticeElement, notice.offer.price);
  addPropertyType (noticeElement, notice.offer.type);
  addPropertyCapacity (noticeElement, notice.offer.rooms, notice.offer.guests);
  addPropertyTime (noticeElement, notice.offer.checkin, notice.offer.checkout);
  addPropertyFeature (noticeElement, notice.offer.features);
  addProperty(noticeElement, description, notice.offer.description);
  addPropertyPhoto (noticeElement, notice.offer.photos);
  addPropertyAvatar (noticeElement, notice.author.avatar);

  return noticeElement;
};

export {renderNotice};
