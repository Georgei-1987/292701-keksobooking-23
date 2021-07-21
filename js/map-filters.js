import {MIN_PRICE_RANGE, MAX_PRICE_RANGE, RERENDER_DELAY, SIMILAR_NOTICE_COUNT} from './constants.js';
import {clearMarkerGroup, renderMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
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

const getNoticeRank = (notice) => {

  let rank = 0;

  if (notice.offer.type === typeFilter.value) {
    rank++;
  }

  if (priceFilter.value === 'middle') {
    if (notice.offer.price >= MIN_PRICE_RANGE && notice.offer.price <= MAX_PRICE_RANGE) {
      rank++;
    }
  }

  if (priceFilter.value === 'low') {
    if (notice.offer.price < MIN_PRICE_RANGE) {
      rank++;
    }
  }

  if (priceFilter.value === 'high') {
    if (notice.offer.price > MAX_PRICE_RANGE) {
      rank++;
    }
  }

  if (notice.offer.rooms === Number(roomsFilter.value)) {
    rank++;
  }

  if (notice.offer.guests === Number(guestsFilter.value)) {
    rank++;
  }

  if (wifiFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === wifiFilter.value) {
        rank++;
      }
    }
  }

  if (dishwasherFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === dishwasherFilter.value) {
        rank++;
      }
    }
  }

  if (parkingFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === parkingFilter.value) {
        rank++;
      }
    }
  }

  if (washerFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === washerFilter.value) {
        rank++;
      }
    }
  }

  if (elevatorFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === elevatorFilter.value) {
        rank++;
      }
    }
  }

  if (conditionerFilter.checked && notice.offer.features) {
    for (const feature of notice.offer.features) {
      if (feature === conditionerFilter.value) {
        rank++;
      }
    }
  }

  return rank;
};

const compareNotices = (noticeA, noticeB) => {
  const rankA = getNoticeRank(noticeA);
  const rankB = getNoticeRank(noticeB);

  return rankB - rankA;
};

const handleFiltersChange = (data) => debounce(() => {
  clearMarkerGroup();

  renderMarkers(Array
    .from(data)
    .sort(compareNotices)
    .slice(0, SIMILAR_NOTICE_COUNT));
}, RERENDER_DELAY);

const filtersHandler = (data) => {
  mapFilters.addEventListener('reset', () => {
    renderMarkers(Array
      .from(data)
      .slice(0, SIMILAR_NOTICE_COUNT));
  });

  renderMarkers(Array
    .from(data)
    .slice(0, SIMILAR_NOTICE_COUNT));
  mapFilters.addEventListener('input', handleFiltersChange(data));
};

export {filtersHandler};
