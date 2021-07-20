import {ALERT_SHOW_TIME} from './constants.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);

  const closeSuccessMessage = (evt) => {
    if (evt.type === 'click' || evt.key === 'Escape') {
      successMessage.remove();
      document.removeEventListener('click', closeSuccessMessage);
      document.removeEventListener('keydown', closeSuccessMessage);
    }
  };

  document.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  const buttonResetErrorMessage = errorMessage.querySelector('.error__button');
  document.body.append(errorMessage);

  const closeErrorMessage = (evt) => {
    if (evt.type === 'click' || evt.key === 'Escape' || evt.target.classList.value === 'error__button') {
      errorMessage.remove();
      document.removeEventListener('click', closeErrorMessage);
      buttonResetErrorMessage.removeEventListener('click', closeErrorMessage);
      document.removeEventListener('keydown', closeErrorMessage);
    }
  };

  document.addEventListener('click', closeErrorMessage);
  buttonResetErrorMessage.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessage);
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
