import {sendData} from './api.js';
import {MAX_PRICE_VALUE, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH} from './constants.js';
import {removeImages, previewImage, housingImage} from './avatar.js';
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
const collectionCapacity = capacityNoticeSelect.children;

const setAttributeDisabled = (array) => {
  array.forEach((number) => {
    collectionCapacity[`${number}`].setAttribute('disabled', '');
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
  removeImages(previewImage, housingImage);
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
    const elem = priceNoticeInput;
    const priceValue = accordanceTypePrice[typeNoticeInput.value];

    if (elem.value > MAX_PRICE_VALUE) {
      elem.setCustomValidity(`Максимальная цена - ${MAX_PRICE_VALUE}`);
    } else if (elem.value < Number(priceValue)) {
      elem.setCustomValidity(`Минимальная цена - ${Number(priceValue)}`);
    } else {
      elem.setCustomValidity('');
    }

    elem.reportValidity();
  });

  roomNoticeSelect.addEventListener('input', (evt) => {
    for (const element of collectionCapacity) {
      element.removeAttribute('disabled');
    }

    switch (evt.target.value) {
      case '1':
        setAttributeDisabled([0,1,3]);
        break;
      case '2':
        setAttributeDisabled([0,3]);
        break;
      case '3':
        setAttributeDisabled([3]);
        break;
      case '100':
        setAttributeDisabled([0,1,2]);
        break;
    }
  });

  titleNoticeInput.addEventListener('input', () => {
    const elem = titleNoticeInput;
    const length = elem.value.length;

    if (length < MIN_TITLE_LENGTH) {
      elem.setCustomValidity(`Осталось ввести ${MIN_TITLE_LENGTH - length} симв.`);
    } else if (length > MAX_TITLE_LENGTH) {
      elem.setCustomValidity(`Удалите лишние ${length - MAX_TITLE_LENGTH} симв.`);
    } else {
      elem.setCustomValidity('');
    }

    elem.reportValidity();
  });

  typeNoticeInput.addEventListener('input', (evt) => {
    const elem = priceNoticeInput;
    const priceValue = accordanceTypePrice[typeNoticeInput.value];
    elem.setAttribute('placeholder', accordanceTypePrice[evt.target.value]);

    if (elem.value) {
      if (elem.value > MAX_PRICE_VALUE) {
        elem.setCustomValidity(`Максимальная цена - ${MAX_PRICE_VALUE}`);
      } else if (elem.value < Number(priceValue)) {
        elem.setCustomValidity(`Минимальная цена - ${Number(priceValue)}`);
      } else {
        elem.setCustomValidity('');
      }

      elem.reportValidity();
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
