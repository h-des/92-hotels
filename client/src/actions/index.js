import axios from 'axios';
import constants from '../utils/constants';

export const fetchPromoted = () => async dispatch => {
  dispatch({ type: constants.FETCH_PROMOTED });

  try {
    const res = await axios.get('/api/promoted');
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
    const res = await axios.get('/api/hotel/?page=1');
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
    const res = await axios.get('/api/cities');
    dispatch({
      payload: res.data,
      type: constants.FETCH_CITIES_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_CITIES_ERROR });
  }
};

export const fetchHotels = filters => async dispatch => {
  dispatch({ type: constants.FETCH_HOTELS });
  if (filters) {
    try {
      const res = await axios.post('/api/hotel/', { ...filters, page: 1 });
      dispatch({
        payload: res.data,
        type: constants.FETCH_HOTELS_SUCCESS
      });
    } catch (error) {
      dispatch({ type: constants.FETCH_HOTELS_ERROR });
    }
  } else {
    try {
      const res = await axios.get('/api/hotel/?page=1');
      dispatch({
        payload: res.data,
        type: constants.FETCH_HOTELS_SUCCESS
      });
    } catch (error) {
      dispatch({ type: constants.FETCH_HOTELS_ERROR });
    }
  }
};

export const fetchMoreHotels = (page, filters) => async dispatch => {
  dispatch({ type: constants.FETCH_MORE_HOTELS });
  if (filters) {
    try {
      const res = await axios.post('/api/hotel/', { ...filters, page });
      dispatch({
        payload: res.data,
        type: constants.FETCH_MORE_HOTELS_SUCCESS
      });
    } catch (error) {
      dispatch({ type: constants.FETCH_MORE_HOTELS_ERROR });
    }
  } else {
    try {
      const res = await axios.get(`/api/hotel/?page=${page}`);
      dispatch({
        payload: res.data,
        type: constants.FETCH_MORE_HOTELS_SUCCESS
      });
    } catch (error) {
      dispatch({ type: constants.FETCH_MORE_HOTELS_ERROR });
    }
  }
};

export const fetchHotelInfo = id => async dispatch => {
  dispatch({ type: constants.FETCH_HOTEL_INFO });
  try {
    const res = await axios.get(`/api/hotel/${id}`);
    dispatch({
      payload: res.data,
      type: constants.FETCH_HOTEL_INFO_SUCCESS
    });
  } catch (error) {
    dispatch({ type: constants.FETCH_HOTEL_INFO_ERROR });
  }
};

export const checkAvailability = data => async dispatch => {
  dispatch({ type: constants.CHECK_AVAILABILITY });
  try {
    const res = await axios.get(
      `/api/hotel/availability/${data.id}?from=${data.from}&to=${
        data.to
      }&roomType=${data.roomType}`
    );
    dispatch({
      type: constants.CHECK_AVAILABILITY_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: constants.CHECK_AVAILABILITY_ERROR });
  }
};

export const proceedToPayment = data => async dispatch => {
  dispatch({ type: constants.PROCEED_TO_PAYMENT });
  try {
    const res = await axios.post('/api/booking/', data);
    dispatch({
      type: constants.PROCEED_TO_PAYMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {}
};

export const pay = hash => async dispatch => {
  //totally fake
  dispatch({ type: constants.PAYMENT });
  try {
    const res = await axios.post('/api/booking/', { hash });
    dispatch({
      type: constants.PAYMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: constants.PAYMENT_ERROR
    });
  }
};

export const resetAvailability = () => dispatch => {
  dispatch({ type: constants.RESET_AVAILABILITY });
};

export const resetCheckoutData = () => dispatch => {
  dispatch({ type: constants.RESET_CHECKOUT_DATA });
};

export const resetTransaction = () => dispatch => {
  dispatch({ type: constants.RESET_TRANSACTION });
};

export const addFilters = filters => dispatch => {
  dispatch({
    payload: filters,
    type: constants.ADD_FILTERS
  });
};

export const removeFilters = () => dispatch => {
  dispatch({ type: constants.REMOVE_FILTERS });
};

export const logIn = data => async dispatch => {
  dispatch({ type: constants.LOGIN });

  try {
    const res = await axios.post('/auth/login/', data);
    dispatch({ payload: res.data, type: constants.LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ payload: err.response.data, type: constants.LOGIN_ERROR });
  }
};

export const logOut = () => async dispatch => {
  await axios.get('/auth/logout/');
  dispatch({ type: constants.LOGOUT });
};
