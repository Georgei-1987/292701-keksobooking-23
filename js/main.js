import {getArrayObjects} from './data.js';
import {generateNotice} from './generate-element.js';
import {deactivateForm, activateForm, validateForm} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

deactivateForm();
setTimeout(activateForm, 2000);
validateForm();

const arrayNotices = getArrayObjects();

const currentNotice = generateNotice(arrayNotices[0]);

mapCanvas.appendChild(currentNotice);
