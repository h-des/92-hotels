import { combineReducers } from 'redux';
import hotelReducer from './hotelReducer';
import userReducer from './userReducer';
import checkoutReducer from './checkoutReducer';
import tilesReducer from './tilesReducer';
import promotedReducer from './promotedReducer';
import citiesReducer from './citiesReducer';

export default combineReducers({
  hotels: hotelReducer,
  user: userReducer,
  checkout: checkoutReducer,
  tiles: tilesReducer,
  promoted: promotedReducer,
  cities: citiesReducer
});
