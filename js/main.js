import {getArrayObjects} from './data.js';
import {generateNotice} from './generate-element.js';
import './validate-form.js';

const mapCanvas = document.querySelector('#map-canvas');

const arrayNotices = getArrayObjects();

const currentNotice = generateNotice(arrayNotices[0]);

mapCanvas.appendChild(currentNotice);
