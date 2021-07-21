import {getData} from './api.js';
import {deactivateForm, activateForm, setUserFormSubmit, validateForm, setFormDefaultButtonSubmit} from './form.js';
import {onMapLoad} from './map.js';
import {filtersHandler} from './map-filters.js';

deactivateForm();
onMapLoad(activateForm);

getData((notices) => {
  filtersHandler(notices);
});

validateForm();
setUserFormSubmit(setFormDefaultButtonSubmit);
