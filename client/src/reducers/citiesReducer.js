import constants from '../utils/constants';

const initialState = {
  status: constants.INITIAL,
  list: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_CITIES:
      return { ...state, status: constants.LOADING };
    case constants.FETCH_CITIES_ERROR:
      return { ...state, status: constants.ERROR };
    case constants.FETCH_CITIES_SUCCESS:
      return { list: formatData(payload), status: constants.SUCCESS };
    default:
      return state;
  }
};

const formatData = arr => {
  return arr.map(el => ({
    label: el.city,
    value: el.city
  }));
};
