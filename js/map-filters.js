import {MIN_PRICE_RANGE, MAX_PRICE_RANGE, SIMILAR_NOTICE_COUNT, RERENDER_DELAY} from './constants.js';
import {clearMarkerGroup, renderMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('.map__filter');
const mapFeaturesFieldset = mapFilters.querySelector('.map__features');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const wifiFilter = mapFilters.querySelector('#filter-wifi');
const dishwasherFilter = mapFilters.querySelector('#filter-dishwasher');
const parkingFilter = mapFilters.querySelector('#filter-parking');
const washerFilter = mapFilters.querySelector('#filter-washer');
const elevatorFilter = mapFilters.querySelector('#filter-elevator');
const conditionerFilter = mapFilters.querySelector('#filter-conditioner');

const deactivateFilterForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFeaturesFieldset.setAttribute('disabled', '');
  for (const select of mapFiltersSelect) {
    select.setAttribute('disabled', '');
  }
};

const activateFilterForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFeaturesFieldset.removeAttribute('disabled');

  for (const select of mapFiltersSelect) {
    select.removeAttribute('disabled');
  }
};

const resetFilterForm = () => {
  mapFilters.reset();
};

const renderFilteredData = (data) => debounce( () => {
  clearMarkerGroup();

  const getBooleanValue = (elem, selector) => {
    if (elem !== Number(selector.value) && selector.value !== 'any') {
      return true;
    }
  };

  const filteredNotices = Array
    .from(data)
    .filter((notice) => {
      if (notice.offer.type !== typeFilter.value && typeFilter.value !== 'any') {
        return false;
      }
      switch (priceFilter.value) {
        case 'middle':
          if (notice.offer.price <= MIN_PRICE_RANGE || notice.offer.price >= MAX_PRICE_RANGE) {
            return false;
          }
          break;
        case 'low':
          if (notice.offer.price > MIN_PRICE_RANGE) {
            return false;
          }
          break;
        case 'high':
          if (notice.offer.price < MAX_PRICE_RANGE) {
            return false;
          }
          break;
      }

      getBooleanValue(notice.offer.rooms, roomsFilter);

      // if (notice.offer.rooms !== Number(roomsFilter.value) && roomsFilter.value !== 'any') {
      //   return false;
      // }

      if (notice.offer.guests !== Number(guestsFilter.value) && guestsFilter.value !== 'any') {
        return false;
      }
      if (wifiFilter.checked && (!notice.offer.features || !notice.offer.features.includes(wifiFilter.value))) {
        return false;
      }
      if (dishwasherFilter.checked && (!notice.offer.features || !notice.offer.features.includes(dishwasherFilter.value))) {
        return false;
      }
      if (parkingFilter.checked && (!notice.offer.features || !notice.offer.features.includes(parkingFilter.value))) {
        return false;
      }
      if (washerFilter.checked && (!notice.offer.features || !notice.offer.features.includes(washerFilter.value))) {
        return false;
      }
      if (elevatorFilter.checked && (!notice.offer.features || !notice.offer.features.includes(elevatorFilter.value))) {
        return false;
      }
      if (conditionerFilter.checked && (!notice.offer.features || !notice.offer.features.includes(conditionerFilter.value))) {
        return false;
      }

      return true;
    })
    .slice(0, SIMILAR_NOTICE_COUNT);

  renderMarkers(filteredNotices);
}, RERENDER_DELAY);

const appointEventListeners = (data) => {
  mapFilters.addEventListener('input', renderFilteredData(data));
  mapFilters.addEventListener('reset', () => {
    renderMarkers(Array
      .from(data)
      .slice(0, SIMILAR_NOTICE_COUNT));
  });
};

export {activateFilterForm, appointEventListeners, deactivateFilterForm, resetFilterForm};
