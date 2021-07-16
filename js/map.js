import {address} from './form.js';
import {generateNotice} from './generate-element.js';
import {getArrayObjects, ROUNDING_FOR_LOCATION} from './data.js';

const LAT_TOKYO = 35.68949;
const LNG_TOKYO = 139.69171;
const HEIGHT_MAIN_PIN = 52;
const HEIGHT_SIMILAR_PIN = 40;
const WIDTH_MAIN_PIN = 52;
const WIDTH_SIMILAR_PIN = 40;
const ZOOM_MAP = 12;

const arrayNotices = getArrayObjects();
const map = L.map('map-canvas');

const onLoad = (func) => {
  map.on('load', () => {
    func();
  });
  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, ZOOM_MAP);
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
      iconSize: [WIDTH_MAIN_PIN, HEIGHT_MAIN_PIN],
      iconAnchor: [WIDTH_MAIN_PIN/2, HEIGHT_MAIN_PIN],
    },
  );
  const mainPinMarker = L.marker(
    {
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(ROUNDING_FOR_LOCATION)}, ${evt.target.getLatLng().lng.toFixed(ROUNDING_FOR_LOCATION)}`;
  });
};

const createMarker = (notice) => {
  const markerIcon = L.icon(
    {
      iconUrl: 'img/pin.svg',
      iconSize: [WIDTH_SIMILAR_PIN, HEIGHT_SIMILAR_PIN],
      iconAnchor: [WIDTH_SIMILAR_PIN/2, HEIGHT_SIMILAR_PIN],
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
};

const renderMarkers = () => {
  arrayNotices.forEach((notice) => {
    createMarker(notice);
  });
};

export {onLoad, createMainMarker, renderMarkers, LAT_TOKYO, LNG_TOKYO};
