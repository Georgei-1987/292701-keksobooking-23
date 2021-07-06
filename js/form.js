const formNotice = document.querySelector('.ad-form');
const fieldset = formNotice.getElementsByTagName('fieldset');
const mapFilters = document.querySelector('.map__filters');

const deactivateForm = () => {
  formNotice.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (const elem of fieldset) {
    elem.setAttribute('disabled', '');
  }
};

const activateForm = () => {
  formNotice.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (const elem of fieldset) {
    elem.removeAttribute('disabled');
  }
};

const validateForm = () => {
  const MAX_PRICE_LENGTH = 1000000;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const objectTypePrice = {
    bungalow: '0',
    flat: '1000',
    hotel: '3000',
    house: '5000',
    palace: '10000',
  };

  const capacityNoticeInput = document.querySelector('#capacity');
  const priceNoticeInput = document.querySelector('#price');
  const roomNoticeInput = document.querySelector('#room_number');
  const typeNoticeInput = document.querySelector('#type');
  const titleNoticeInput = document.querySelector('#title');

  priceNoticeInput.addEventListener('input', () => {
    const value = priceNoticeInput.value;

    if (value > MAX_PRICE_LENGTH) {
      priceNoticeInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE_LENGTH }`);
    } else if (value < Number(objectTypePrice[typeNoticeInput.value])) {
      priceNoticeInput.setCustomValidity(`Минимальная цена - ${ Number(objectTypePrice[typeNoticeInput.value]) }`);
    } else {
      priceNoticeInput.setCustomValidity('');
    }

    priceNoticeInput.reportValidity();
  });

  roomNoticeInput.addEventListener('input', (evt) => {
    const collectionCapacity = capacityNoticeInput.children;
    for (const element of collectionCapacity) {
      element.removeAttribute('disabled');
      // element.focus();
    }

    switch (evt.target.value) {
      case '1':
        collectionCapacity[0].setAttribute('disabled', '');
        collectionCapacity[1].setAttribute('disabled', '');
        collectionCapacity[3].setAttribute('disabled', '');
        break;
      case '2':
        collectionCapacity[0].setAttribute('disabled', '');
        collectionCapacity[3].setAttribute('disabled', '');
        break;
      case '3':
        collectionCapacity[3].setAttribute('disabled', '');
        break;
      case '100':
        collectionCapacity[0].setAttribute('disabled', '');
        collectionCapacity[1].setAttribute('disabled', '');
        collectionCapacity[2].setAttribute('disabled', '');
        break;
    }
  });

  titleNoticeInput.addEventListener('input', () => {
    const valueLength = titleNoticeInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleNoticeInput.setCustomValidity(`Осталось ввести ${ MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleNoticeInput.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      titleNoticeInput.setCustomValidity('');
    }

    titleNoticeInput.reportValidity();
  });

  typeNoticeInput.addEventListener('input', (evt) => {
    priceNoticeInput.setAttribute('placeholder', objectTypePrice[evt.target.value]);

    if (priceNoticeInput.value) {
      const value = priceNoticeInput.value;

      if (value > MAX_PRICE_LENGTH) {
        priceNoticeInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE_LENGTH }`);
      } else if (value < Number(objectTypePrice[typeNoticeInput.value])) {
        priceNoticeInput.setCustomValidity(`Минимальная цена - ${ Number(objectTypePrice[typeNoticeInput.value]) }`);
      } else {
        priceNoticeInput.setCustomValidity('');
      }

      priceNoticeInput.reportValidity();
    }
  });
};

export {deactivateForm, activateForm, validateForm};