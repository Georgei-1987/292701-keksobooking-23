import {getData} from './api.js';
import {SIMILAR_NOTICE_COUNT} from './constants.js';
import {deactivateForm, activateForm, setUserFormSubmit, setFormDefault, validateForm} from './form.js';
import {onMapLoad, renderMarkers} from './map.js';

deactivateForm();
onMapLoad(activateForm);
getData( (notices) =>
  renderMarkers(notices.slice(0, SIMILAR_NOTICE_COUNT) ),
);
validateForm();
setUserFormSubmit(setFormDefault);

