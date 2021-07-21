const accordanceTypePrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const ADDRESS_FOR_GET_METHOD = 'https://23.javascript.pages.academy/keksobooking/data';
const ADDRESS_FOR_POST_METHOD = 'https://23.javascript.pages.academy/keksobooking';
const ALERT_SHOW_TIME = 5000;
const LAT_TOKYO = 35.68949;
const LNG_TOKYO = 139.69171;
const HEIGHT_MAIN_PIN = 52;
const HEIGHT_SIMILAR_PIN = 40;
const MAX_PRICE_VALUE = 1000000;
const MAX_PRICE_RANGE = 50000;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_RANGE = 10000;
const MIN_TITLE_LENGTH = 30;
const RERENDER_DELAY = 500;
const ROUNDING_FOR_LOCATION = 5;
const SIMILAR_NOTICE_COUNT = 10;
const WIDTH_MAIN_PIN = 52;
const WIDTH_SIMILAR_PIN = 40;
const ZOOM_MAP = 12;

export {accordanceTypePrice, ADDRESS_FOR_GET_METHOD, ADDRESS_FOR_POST_METHOD, ALERT_SHOW_TIME, HEIGHT_MAIN_PIN, HEIGHT_SIMILAR_PIN, MAX_PRICE_RANGE, MAX_PRICE_VALUE, MIN_PRICE_RANGE, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, LAT_TOKYO, LNG_TOKYO, objectType, RERENDER_DELAY, ROUNDING_FOR_LOCATION, SIMILAR_NOTICE_COUNT, WIDTH_MAIN_PIN, WIDTH_SIMILAR_PIN, ZOOM_MAP};
