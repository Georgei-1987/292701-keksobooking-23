import {sendData} from './api.js';
import {MAX_PRICE_VALUE, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH} from './constants.js';
import {setDefaultAddress, setDefaultMainMarker, setDefaultMap, clearMarkerGroup} from './map.js';
import {resetFilterForm} from './map-filters.js';
import {showSuccessMessage} from './popup-messages.js';

const accordanceTypePrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
const formNotice = document.querySelector('.ad-form');
const formHeaderFieldset = formNotice.querySelector('.ad-form-header');
const formElementFieldset = formNotice.querySelectorAll('.ad-form__element');
const capacityNoticeSelect = formNotice.querySelector('#capacity');
const priceNoticeInput = formNotice.querySelector('#price');
const roomNoticeSelect = formNotice.querySelector('#room_number');
const timeInNoticeSelect = formNotice.querySelector('#timein');
const timeOutNoticeSelect = formNotice.querySelector('#timeout');
const typeNoticeInput = formNotice.querySelector('#type');
const titleNoticeInput = formNotice.querySelector('#title');
const buttonFormReset = formNotice.querySelector('.ad-form__reset');

const setUserFormSubmit = (onSuccess) => {
  formNotice.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      () => onSuccess(),
    );
  });
};

const resetNoticeForm = () => {
  formNotice.reset();
};

const setFormDefault = () => {
  clearMarkerGroup();
  resetNoticeForm();
  resetFilterForm();
  setDefaultAddress();
  setDefaultMainMarker();
  setDefaultMap();
  priceNoticeInput.value = '';
  for (const opt of typeNoticeInput.options) {
    if (opt.hasAttribute('selected')) {
      typeNoticeInput.value = opt.value;
      priceNoticeInput.setAttribute('placeholder', accordanceTypePrice[opt.value]);
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

const setFormDefaultButtonSubmit = () => {
  showSuccessMessage();
  setFormDefault();
};

const deactivateNoticeForm = () => {
  formNotice.classList.add('ad-form--disabled');
  formHeaderFieldset.setAttribute('disabled', '');

  for (const elem of formElementFieldset) {
    elem.setAttribute('disabled', '');
  }
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

    if (value > MAX_PRICE_VALUE) {
      priceNoticeInput.setCustomValidity(`Максимальная цена - ${MAX_PRICE_VALUE}`);
    } else if (value < Number(accordanceTypePrice[typeNoticeInput.value])) {
      priceNoticeInput.setCustomValidity(`Минимальная цена - ${Number(accordanceTypePrice[typeNoticeInput.value])}`);
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
    priceNoticeInput.setAttribute('placeholder', accordanceTypePrice[evt.target.value]);

    if (priceNoticeInput.value) {
      const value = priceNoticeInput.value;

      if (value > MAX_PRICE_VALUE) {
        priceNoticeInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE_VALUE }`);
      } else if (value < Number(accordanceTypePrice[typeNoticeInput.value])) {
        priceNoticeInput.setCustomValidity(`Минимальная цена - ${ Number(accordanceTypePrice[typeNoticeInput.value]) }`);
      } else {
        priceNoticeInput.setCustomValidity('');
      }

      priceNoticeInput.reportValidity();
    }
  });
};

const activateNoticeForm = () => {
  formNotice.classList.remove('ad-form--disabled');
  formHeaderFieldset.removeAttribute('disabled');
  for (const elem of formElementFieldset) {
    elem.removeAttribute('disabled');
  }

  setDefaultAddress();
  validateForm();
  setUserFormSubmit(setFormDefaultButtonSubmit);
  buttonFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    setFormDefault();
  });
};

export {deactivateNoticeForm, activateNoticeForm};
