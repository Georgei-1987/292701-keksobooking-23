import {getData} from './api.js';
import {deactivateNoticeForm} from './form.js';
import {fulfillRendering, loadMap} from './map.js';
import {deactivateFilterForm} from './map-filters.js';

deactivateNoticeForm();
deactivateFilterForm();
loadMap(() => {
  getData((notices) => {
    fulfillRendering(notices);
  });
});


