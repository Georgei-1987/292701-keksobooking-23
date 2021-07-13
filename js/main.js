import {deactivateForm, activateForm, validateForm} from './form.js';
import {initMap, createMainMarker, renderMarkers} from './map.js';

deactivateForm();
initMap(activateForm);
createMainMarker();
renderMarkers();
validateForm();
