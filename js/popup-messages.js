import {ALERT_SHOW_TIME} from './constants.js';

const showSuccessMessage = () => {
  const successTemplate = document
    .querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);

  const closeOnEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
      document.removeEventListener('keydown', closeOnEscHandler);
    }
  };

  const closeClickMessageHandler = () => {
    successMessage.remove();
    document.removeEventListener('keydown', closeOnEscHandler);
  };

  successMessage.addEventListener('click', closeClickMessageHandler);
  document.addEventListener('keydown', closeOnEscHandler);
};

const showErrorMessage = () => {
  const errorTemplate = document
    .querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.append(errorMessage);

  const closeOnEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
      document.removeEventListener('keydown', closeOnEscHandler);
    }
  };

  const closeClickMessageHandler = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', closeOnEscHandler);
  };

  errorMessage.addEventListener('click', closeClickMessageHandler);
  document.addEventListener('keydown', closeOnEscHandler);
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
