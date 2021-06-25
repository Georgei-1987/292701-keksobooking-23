import {getArrayObjects} from './data.js';
import {generateNotice} from './generate-element.js';

const arrayNotices = getArrayObjects();

generateNotice(arrayNotices[0]);
