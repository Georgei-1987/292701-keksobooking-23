import {ADDRESS_FOR_GET_METHOD, ADDRESS_FOR_POST_METHOD} from './constants.js';
import {showAlert, showErrorMessage} from './popup-messages.js';

const getData = (onSuccess) => {
  fetch(ADDRESS_FOR_GET_METHOD)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        showAlert(`${response.status} — ${response.statusText}`);
      }
    })
    .then ((response) => response.json())
    .then((notices) => {
      onSuccess(notices);
    })
    .catch((error) => {
      showAlert(error);
    });
};

const sendData = (body, onSuccess) => {
  fetch(
    ADDRESS_FOR_POST_METHOD,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};
