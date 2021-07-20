import {getData} from './api.js';
import {RERENDER_DELAY} from './constants.js';
import {deactivateForm, activateForm, setUserFormSubmit, setFormDefault, validateForm} from './form.js';
import {onMapLoad, renderMarkers} from './map.js';
import {setTypeClick, setPriceClick, setRoomsClick, setGuestsClick, setWifiClick, setDishwasherClick, setParkingClick, setWasherClick, setElevatorClick, setConditionerClick} from './map-filters.js';
import {debounce} from './utils/debounce.js';

deactivateForm();
onMapLoad(activateForm);

getData( (notices) => {
  renderMarkers(notices);
  setTypeClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setPriceClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setRoomsClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setGuestsClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setWifiClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setDishwasherClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setParkingClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setWasherClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setElevatorClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
  setConditionerClick(debounce(
    () => renderMarkers(notices),
    RERENDER_DELAY,
  ));
});

validateForm();
setUserFormSubmit(setFormDefault);
