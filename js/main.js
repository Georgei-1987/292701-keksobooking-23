import {deactivateForm, activateForm, validateForm} from './form.js';
import {onLoad, createMainMarker, renderMarkers} from './map.js';

deactivateForm();
onLoad(activateForm);
createMainMarker();
renderMarkers();
validateForm();
