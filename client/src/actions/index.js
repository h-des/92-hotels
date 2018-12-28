import axios from 'axios';
import constants from '../utils/constants';

export const fetchPromoted = () => async dispatch => {
  dispatch({ type: constants.FETCH_PROMOTED });

  try {
    const res = await axios.get('api/promoted');
    dispatch({
      payload: res.data,
      type: constants.FETCH_PROMOTED_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_PROMOTED_ERROR });
  }
};

export const fetchTiles = () => async dispatch => {
  dispatch({ type: constants.FETCH_TILES });

  try {
    const res = await axios.get('api/hotel/?page=1');
    dispatch({
      payload: res.data.docs,
      type: constants.FETCH_TILES_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_TILES_ERROR });
  }
};

export const fetchCities = () => async dispatch => {
  dispatch({ type: constants.FETCH_CITIES });

  try {
    const res = await axios.get('api/cities');
    dispatch({
      payload: res.data,
      type: constants.FETCH_CITIES_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_CITIES_ERROR });
  }
};

export const fetchHotels = () => async dispatch => {
  dispatch({ type: constants.FETCH_HOTELS });

  try {
    const res = await axios.get('api/hotel/?page=1');
    dispatch({
      payload: res.data,
      type: constants.FETCH_HOTELS_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_HOTELS_ERROR });
  }
};

export const fetchMoreHotels = page => async dispatch => {
  dispatch({ type: constants.FETCH_MORE_HOTELS });

  try {
    const res = await axios.get(`api/hotel/?page=${page}`);
    dispatch({
      payload: res.data,
      type: constants.FETCH_MORE_HOTELS_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_MORE_HOTELS_ERROR });
  }
};

export const logIn = data => async dispatch => {
  dispatch({ type: constants.LOGIN });

  try {
    const res = await axios.post('auth/login/', data);
    dispatch({ payload: res.data, type: constants.LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ payload: err.response.data, type: constants.LOGIN_ERROR });
  }
};

export const logOut = () => async dispatch => {
  await axios.get('auth/logout/');
  dispatch({ type: constants.LOGOUT });
};
