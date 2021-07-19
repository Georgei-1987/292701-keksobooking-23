import {ALERT_SHOW_TIME} from './constants.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);

  const closeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('click', closeSuccessMessage);
  };

  const closeSuccessMessageKeydownListener = (evt) => {
    if (evt.code === 'Escape') {
      closeSuccessMessage();
      document.removeEventListener('keydown', closeSuccessMessageKeydownListener);
    }
  };

  document.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessageKeydownListener);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  const buttonResetErrorMessage = errorMessage.querySelector('.error__button');
  document.body.append(errorMessage);

  const closeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('click', closeErrorMessage);
    buttonResetErrorMessage.removeEventListener('click', closeErrorMessage);
  };

  const closeErrorMessageKeydownListener = (evt) => {
    if (evt.code === 'Escape') {
      closeErrorMessage();
      document.removeEventListener('keydown', closeErrorMessageKeydownListener);
    }
  };

  document.addEventListener('click', closeErrorMessage);
  buttonResetErrorMessage.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessageKeydownListener);
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
