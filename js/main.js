import {getData} from './api.js';
import {deactivateForm, setUserFormSubmit, validateForm, setFormDefaultButtonSubmit} from './form.js';
import {loadMap} from './map.js';
import {filtersHandler} from './map-filters.js';

deactivateForm();

// setTimeout(() => {

  loadMap( () => {
    getData( (notices) => {
      // setTimeout( () => {
        filtersHandler(notices);
      // }, 2000 );

    });
  });

// }, 2000);

validateForm();
setUserFormSubmit(setFormDefaultButtonSubmit);
