import {NUMBER_CHOOSING_FILE, FILE_TYPES} from './constants.js';

const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserHousing = document.querySelector('#images');
const previewImage = document.querySelector('.ad-form-header__preview img');
const housingImage = document.querySelector('.ad-form__photo');
const anchorDefaultPreviewImage = previewImage.src;

const removeImages = (containerAv, containerImg) => {
  containerAv.src = anchorDefaultPreviewImage;
  containerImg.firstChild.remove();
};

const appointEvtListenerAvatar = (container, reader) => {
  reader.addEventListener('load', () => {
    container.src = reader.result;
  });
};

const appointEvtListenerImage = (container, reader) => {
  reader.addEventListener('load', () => {
    container.insertAdjacentHTML('beforeEnd', `<img src= ${reader.result} id="housing__image" alt="Фото жилья" width="70" height="70">`);
  });
};

const renderImage = (chooser, container, marker) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[NUMBER_CHOOSING_FILE];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      if (marker) {
        appointEvtListenerAvatar(container, reader);
      } else {
        appointEvtListenerImage(container, reader);
      }

      reader.readAsDataURL(file);
    }
  });
};

renderImage(fileChooserAvatar, previewImage, true);
renderImage(fileChooserHousing, housingImage, false);

export {removeImages, previewImage, housingImage};
