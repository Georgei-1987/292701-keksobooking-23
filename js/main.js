import {getData/*, showAlert, sendData*/} from './api.js';
import {deactivateForm, activateForm, validateForm, setUserFormSubmit} from './form.js';
// import {generateNotice} from './generate-element.js';
import {onLoad, createMainMarker, /*createMarker,*/ renderMarkers} from './map.js';

const SIMILAR_NOTICE_COUNT = 10;

deactivateForm();
onLoad(activateForm);
createMainMarker();

getData( (notices) => renderMarkers(notices.slice(0, SIMILAR_NOTICE_COUNT) ),
);


validateForm();

setUserFormSubmit();
