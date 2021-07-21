import {sendData} from './api.js';
import {accordanceTypePrice, MAX_PRICE_VALUE, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH} from './constants.js';
import {setDefaultAddress, setDefaultMainMarker, setDefaultMap, clearMarkerGroup} from './map.js';
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
const buttonFormReset = document.querySelector('.ad-form__reset');

const setFormDefault = () => {
  clearMarkerGroup();
  formNotice.reset();
  mapFilters.reset();
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

buttonFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});

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

const setUserFormSubmit = (onSuccess) => {
  formNotice.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      () => onSuccess(),
    );
  });
};

export {deactivateForm, activateForm, setUserFormSubmit, setFormDefaultButtonSubmit, setFormDefault, validateForm, addressNoticeInput};
