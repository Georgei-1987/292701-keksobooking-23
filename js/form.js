import {sendData} from './api.js';
import {ACCORDANCE_TYPE_PRICE, MAX_PRICE_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH} from './constants.js';
import {setDefaultAddress, setDefaultMainMarker, setDefaultMap} from './map.js';
import {showSuccessMessage} from './popup-messages.js';

const mapFilters = document.querySelector('.map__filters');
const formNotice = document.querySelector('.ad-form');
const fieldset = formNotice.getElementsByTagName('fieldset');
const addressNoticeInput = formNotice.querySelector('#address');
const capacityNoticeSelect = formNotice.querySelector('#capacity');
const priceNoticeInput = formNotice.querySelector('#price');
const roomNoticeSelect = formNotice.querySelector('#room_number');
const timeInNoticeSelect = formNotice.querySelector('#timein');
const timeOutNoticeSelect = formNotice.querySelector('#timeout');
const typeNoticeInput = formNotice.querySelector('#type');
const titleNoticeInput = formNotice.querySelector('#title');
const buttonFormReset = formNotice.querySelector('.ad-form__reset');

const setFormDefault = () => {
  showSuccessMessage();
  mapFilters.reset();
  formNotice.reset();
  setDefaultMainMarker();
  setDefaultAddress();
  setDefaultMap();
  priceNoticeInput.value = '';
  for (const opt of typeNoticeInput.options) {
    if (opt.hasAttribute('selected')) {
      typeNoticeInput.value = opt.value;
      priceNoticeInput.setAttribute('placeholder', ACCORDANCE_TYPE_PRICE[opt.value]);
    }
  }
  for (const opt of capacityNoticeSelect.options) {
    if (opt.value === '1') {
      capacityNoticeSelect.value = opt.value;
    } else {
      opt.setAttribute('disabled', 'true');
    }
  }
};

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

  setDefaultAddress();
};

const validateForm = () => {
  if (!priceNoticeInput.value) {
    priceNoticeInput.setCustomValidity('Введите пожалуйста цену');
  }

  timeInNoticeSelect.addEventListener('input', (evt) => {
    timeInNoticeSelect.value = evt.target.value;
    timeOutNoticeSelect.value = evt.target.value;
  });

  timeOutNoticeSelect.addEventListener('input', (evt) => {
    timeOutNoticeSelect.value = evt.target.value;
    timeInNoticeSelect.value = evt.target.value;
  });

  priceNoticeInput.addEventListener('input', () => {
    const value = priceNoticeInput.value;

    if (value > MAX_PRICE_LENGTH) {
      priceNoticeInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE_LENGTH }`);
    } else if (value < Number(ACCORDANCE_TYPE_PRICE[typeNoticeInput.value])) {
      priceNoticeInput.setCustomValidity(`Минимальная цена - ${ Number(ACCORDANCE_TYPE_PRICE[typeNoticeInput.value]) }`);
    } else {
      priceNoticeInput.setCustomValidity('');
    }

    priceNoticeInput.reportValidity();
  });

  roomNoticeSelect.addEventListener('input', (evt) => {
    const collectionCapacity = capacityNoticeSelect.children;
    for (const element of collectionCapacity) {
      element.removeAttribute('disabled');
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
    priceNoticeInput.setAttribute('placeholder', ACCORDANCE_TYPE_PRICE[evt.target.value]);

    if (priceNoticeInput.value) {
      const value = priceNoticeInput.value;

      if (value > MAX_PRICE_LENGTH) {
        priceNoticeInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE_LENGTH }`);
      } else if (value < Number(ACCORDANCE_TYPE_PRICE[typeNoticeInput.value])) {
        priceNoticeInput.setCustomValidity(`Минимальная цена - ${ Number(ACCORDANCE_TYPE_PRICE[typeNoticeInput.value]) }`);
      } else {
        priceNoticeInput.setCustomValidity('');
      }

      priceNoticeInput.reportValidity();
    }
  });
};
const setUserFormSubmit = (onSuccess) => {
  formNotice.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      () => onSuccess(),
    );
  });
};

buttonFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});

export {deactivateForm, activateForm, setUserFormSubmit, setFormDefault, validateForm, addressNoticeInput};
