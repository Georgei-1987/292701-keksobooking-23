import {ALERT_SHOW_TIME} from './constants.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);

  const removeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', removeSuccessMessage);
  };

  document.addEventListener('click', () => {
    removeSuccessMessage();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      removeSuccessMessage();
    }
  });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  const buttonResetErrorMessage = errorMessage.querySelector('.error__button');
  document.body.append(errorMessage);

  const removeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('click', removeErrorMessage);
    buttonResetErrorMessage.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', removeErrorMessage);
  };

  document.addEventListener('click', removeErrorMessage);

  buttonResetErrorMessage.addEventListener('click', removeErrorMessage);

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      removeErrorMessage();
    }
  });
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showErrorMessage, showSuccessMessage};
