import {getData} from './api.js';
import {deactivateForm, activateForm, setUserFormSubmit, setFormDefault, validateForm} from './form.js';
import {onMapLoad, renderMarkers} from './map.js';

deactivateForm();
onMapLoad(activateForm);
getData( (notices) => {
  renderMarkers(notices);
});
validateForm();
setUserFormSubmit(setFormDefault);
