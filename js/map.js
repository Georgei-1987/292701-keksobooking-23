import {LAT_TOKYO, LNG_TOKYO, HEIGHT_MAIN_PIN, HEIGHT_SIMILAR_PIN, ROUNDING_FOR_LOCATION, WIDTH_MAIN_PIN, WIDTH_SIMILAR_PIN, ZOOM_MAP} from './constants.js';
import {addressNoticeInput, activateForm} from './form.js';
import {renderNotice} from './render-element.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

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

const addMainMarker = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    addressNoticeInput.value = `${evt.target.getLatLng().lat.toFixed(ROUNDING_FOR_LOCATION)}, ${evt.target.getLatLng().lng.toFixed(ROUNDING_FOR_LOCATION)}`;
  });
};

const setDefaultMainMarker = () => {
  mainPinMarker.setLatLng([LAT_TOKYO, LNG_TOKYO]);
};

const clearMarkerGroup = () => {
  markerGroup.clearLayers();
};

const setDefaultAddress = () => {
  addressNoticeInput.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;
};

const addMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const setDefaultMap = () => {
  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, ZOOM_MAP);
};

const loadMap = ( cb ) => {
  map.on('load', () => {
    activateForm();
    addMainMarker();
    cb();
  });
  addMap();
  setDefaultMap();
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
    .addTo(markerGroup)
    .bindPopup(
      renderNotice(notice),
      {
        keepInView: true,
      },
    );
};

const renderMarkers = (notices) => {
  notices
    .forEach((notice) => {
      createMarker(notice);
    });
};

export {clearMarkerGroup, loadMap, renderMarkers, setDefaultAddress, setDefaultMainMarker, setDefaultMap};
