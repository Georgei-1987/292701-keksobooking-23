import {NUMBER_CHOOSING_FILE, FILE_TYPES} from './constants.js';

const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserHousing = document.querySelector('#images');
const previewImage = document.querySelector('.ad-form-header__preview img');
const housingImageContainer = document.querySelector('.ad-form__photo');
const anchorDefaultPreviewImage = previewImage.src;

const createHousingImage = () => {
  const housingImage = document.createElement('img');
  housingImage.setAttribute('height', '70');
  housingImage.setAttribute('width', '70');
  housingImage.setAttribute('id', 'housing-image');
  housingImageContainer.append(housingImage);
};

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
    container.src = reader.result;
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
        appointEvtListenerImage(housingImageContainer.querySelector('#housing-image'), reader);
      }

      reader.readAsDataURL(file);
    }
  });
};

renderImage(fileChooserAvatar, previewImage, true);
renderImage(fileChooserHousing, housingImageContainer, false);

export {createHousingImage, removeImages, previewImage, housingImageContainer};
