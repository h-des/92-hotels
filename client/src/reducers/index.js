import { combineReducers } from 'redux';
import hotelReducer from './hotelReducer';
import userReducer from './userReducer';
import checkoutReducer from './checkoutReducer';
import filtersReducer from './filtersReducer';
import promotedReducer from './promotedReducer';

export default combineReducers({
  rooms: hotelReducer,
  user: userReducer,
  checkout: checkoutReducer,
  filters: filtersReducer,
  promoted: promotedReducer
});
