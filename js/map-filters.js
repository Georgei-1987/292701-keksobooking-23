import {MIN_PRICE_RANGE, MAX_PRICE_RANGE, RERENDER_DELAY, SIMILAR_NOTICE_COUNT} from './constants.js';
import {activateMapFilters} from './form.js';
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

// const getNoticeRank = (notice) => {

//   let rank = 0;

//   if (notice.offer.type === typeFilter.value) {
//     rank++;
//   }

//   if (priceFilter.value === 'middle') {
//     if (notice.offer.price >= MIN_PRICE_RANGE && notice.offer.price <= MAX_PRICE_RANGE) {
//       rank++;
//     }
//   }

//   if (priceFilter.value === 'low') {
//     if (notice.offer.price < MIN_PRICE_RANGE) {
//       rank++;
//     }
//   }

//   if (priceFilter.value === 'high') {
//     if (notice.offer.price > MAX_PRICE_RANGE) {
//       rank++;
//     }
//   }

//   if (notice.offer.rooms === Number(roomsFilter.value)) {
//     rank++;
//   }

//   if (notice.offer.guests === Number(guestsFilter.value)) {
//     rank++;
//   }

//   if (wifiFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === wifiFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   if (dishwasherFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === dishwasherFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   if (parkingFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === parkingFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   if (washerFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === washerFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   if (elevatorFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === elevatorFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   if (conditionerFilter.checked && notice.offer.features) {
//     for (const feature of notice.offer.features) {
//       if (feature === conditionerFilter.value) {
//         rank++;
//         break;
//       }
//     }
//   }

//   return rank;
// };

// const compareNotices = (noticeA, noticeB) => {
//   const rankA = getNoticeRank(noticeA);
//   const rankB = getNoticeRank(noticeB);

//   return rankB - rankA;
// };

const handleFiltersChange = (data) => debounce( () => {
  clearMarkerGroup();

  const changingArray = Array
    .from(data)
    .filter( (notice) => {
      if (notice.offer.type === typeFilter.value || typeFilter.value === 'any' ) {
        return true;
      }
    })

    // .filter( (notice) => {
    //   if (priceFilter.value === 'middle' || priceFilter.value === 'any') {
    //     if (notice.offer.price >= MIN_PRICE_RANGE && notice.offer.price <= MAX_PRICE_RANGE) {
    //       return true;
    //     }
    //   }
    // })

    // .filter( (notice) => {
    //   if (priceFilter.value === 'low' || priceFilter.value === 'any') {
    //     if (notice.offer.price < MIN_PRICE_RANGE) {
    //       return true;
    //     }
    //   }
    // })

    .filter( (notice) => {
      if (notice.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === 'any' ) {
        return true;
      }
    })
    .slice(0, SIMILAR_NOTICE_COUNT);


  renderMarkers(changingArray);

    // Array.from(data)
    // .filter(compareNotices2)
    // .sort(compareNotices)
    // .slice(0, SIMILAR_NOTICE_COUNT)
    // );
}, RERENDER_DELAY);


const filtersHandler = (data) => {
  mapFilters.addEventListener( 'input', handleFiltersChange(data) );
  mapFilters.addEventListener('reset', () => {
    renderMarkers(Array
      .from(data)
      .slice(0, SIMILAR_NOTICE_COUNT));
  });

  renderMarkers(Array
    .from(data)
    .slice(0, SIMILAR_NOTICE_COUNT));
  activateMapFilters();
};

export {filtersHandler};

// const compareNotices2 = (notice) => {

//   // let rank = 0;

//   if (notice.offer.type === typeFilter.value/* || typeFilter.value === 'any'*/) {

//     // if (notice.offer.rooms === Number(roomsFilter.value)) {
//       return true;
//     // }

//   }

//   // if (notice.offer.rooms === Number(roomsFilter.value)) {
//   //   // rank++;
//   // }

//   // if (rank) {
//   //   return true;
//   // }
//   // return false;
// };
