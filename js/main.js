import {deactivateForm, activateForm, validateForm} from './form.js';
import {initMap, createMainMarker, createMarkers} from './map.js';

deactivateForm();
initMap(activateForm);
createMainMarker();
createMarkers();
validateForm();
