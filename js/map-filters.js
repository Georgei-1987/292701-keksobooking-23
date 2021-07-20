import {markerGroup} from './map.js';

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

const removeCallFunction = (cb) => {
  markerGroup.clearLayers();
  cb();
};

const setTypeClick = (cb) => {
  typeFilter.addEventListener('input', () => {
    removeCallFunction(cb);
  });
};

const setPriceClick = (cb) => {
  priceFilter.addEventListener('input', () => {
    removeCallFunction(cb);
  });
};

const setRoomsClick = (cb) => {
  roomsFilter.addEventListener('input', () => {
    removeCallFunction(cb);
  });
};

const setGuestsClick = (cb) => {
  guestsFilter.addEventListener('input', () => {
    removeCallFunction(cb);
  });
};

const setWifiClick = (cb) => {
  wifiFilter.addEventListener('change', () => {
    if (wifiFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const setDishwasherClick = (cb) => {
  dishwasherFilter.addEventListener('change', () => {
    if (dishwasherFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const setParkingClick = (cb) => {
  parkingFilter.addEventListener('change', () => {
    if (parkingFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const setWasherClick = (cb) => {
  washerFilter.addEventListener('change', () => {
    if (washerFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const setElevatorClick = (cb) => {
  elevatorFilter.addEventListener('change', () => {
    if (elevatorFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const setConditionerClick = (cb) => {
  conditionerFilter.addEventListener('change', () => {
    if (conditionerFilter.checked) {
      removeCallFunction(cb);
    } else {
      removeCallFunction(cb);
    }
  });
};

const getNoticeRank = (notice) => {

  let rank = 0;

  if (notice.offer.type === typeFilter.value) {
    rank++;
  }
  if (priceFilter.value === 'middle') {
    if (notice.offer.price >= 10000 && notice.offer.price <= 50000) {
      rank++;
    }
  }
  if (priceFilter.value === 'low') {
    if (notice.offer.price < 10000) {
      rank++;
    }
  }
  if (priceFilter.value === 'high') {
    if (notice.offer.price > 50000) {
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

// const mapFilters = document.querySelector('.map__filters');
// const roomsFilter = mapFilters.querySelector('#housing-rooms');

// const setRoomsClick = (cb) => {
//   roomsFilter.addEventListener('input', () => {
//     markerGroup.clearLayers();
//     cb();
//     console.log(roomsFilter.value);
//   });
// };


// setRoomsClick( () => renderMarkers(notices) );


// const renderMarkers = (notices) => {
//   notices
//     .slice()
//     .sort(compareNotices)
//     .slice(0, SIMILAR_NOTICE_COUNT)
//     .forEach((notice) => {
//       createMarker(notice);
//     });
// };


// const getNoticeRank = (notice) => {
//   let rank = 0;

//   if (notice.offer.rooms === roomsFilter.value) {
//     rank += 1;
//   }
//   return rank;
// };

export {compareNotices, setTypeClick, setPriceClick, setRoomsClick, setGuestsClick, setWifiClick, setDishwasherClick, setParkingClick, setWasherClick, setElevatorClick, setConditionerClick};
