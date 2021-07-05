import {getArrayObjects} from './data.js';
import {generateNotice} from './generate-element.js';
import {validateForm} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
validateForm();

const arrayNotices = getArrayObjects();

const currentNotice = generateNotice(arrayNotices[0]);

mapCanvas.appendChild(currentNotice);
