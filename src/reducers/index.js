import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import userReducer from './userReducer';
import checkout from './checkout';
import filters from './filters';

export default combineReducers({
  rooms: roomReducer,
  user: userReducer,
  checkout: checkout,
  filters: filters
});
