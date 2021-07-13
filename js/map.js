import {address} from './form.js';
import {getArrayObjects} from './data.js';
import {generateNotice} from './generate-element.js';

const arrayNotices = getArrayObjects();
const map = L.map('map-canvas');

const initMap = (func) => {
  map.on('load', () => {
    setTimeout(func, 2000);
  });
  map.setView({
    lat: 35.68949,
    lng: 139.69171,
  }, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createMainMarker = () => {
  const mainPinIcon = L.icon(
    {
      iconUrl: 'img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    },
  );
  const mainPinMarker = L.marker(
    {
      lat: 35.68949,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

const createMarkers = () => {
  arrayNotices.forEach((notice) => {

    const markerIcon = L.icon(
      {
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      },
    );
    const marker = L.marker(
      {
        lat: notice.location.lat,
        lng: notice.location.lng,
      },
      {
        icon: markerIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        generateNotice(notice),
        {
          keepInView: true,
        },
      );
  });
};

export {initMap, createMainMarker, createMarkers};
