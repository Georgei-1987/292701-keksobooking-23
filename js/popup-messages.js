import {ALERT_SHOW_TIME} from './constants.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.addEventListener('click', () => {
    successMessage.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  // const buttonResetErrorMessage = document.querySelector('#error').content.querySelector('.error__button');
  document.body.append(errorMessage);

  document.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      errorMessage.remove();
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
