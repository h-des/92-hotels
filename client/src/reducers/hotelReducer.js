import constants from '../utils/constants';

const initialState = {
  status: constants.INITIAL,
  specificHotelStatus: constants.INITIAL,
  page: 1,
  pages: 1,
  total: 10,
  list: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.REMOVE_FILTERS:
      return { ...state, status: constants.INITIAL };
    case constants.FETCH_HOTELS:
      return { ...state, status: constants.LOADING };
    case constants.FETCH_HOTELS_ERROR:
      return { ...state, status: constants.ERROR };
    case constants.FETCH_HOTELS_SUCCESS:
      return {
        list: payload.docs,
        page: parseInt(payload.page) + 1,
        pages: payload.pages,
        total: payload.total,
        status: constants.SUCCESS
      };
    case constants.FETCH_MORE_HOTELS:
      return { ...state, status: constants.LOADING };
    case constants.FETCH_MORE_HOTELS_SUCCESS:
      return {
        list: removeDuplicates([...state.list, ...payload.docs]),
        page: parseInt(payload.page) + 1,
        pages: payload.pages,
        total: payload.total,
        status: constants.SUCCESS
      };
    case constants.FETCH_HOTEL_INFO:
      return { ...state, specificHotelStatus: constants.LOADING };
    case constants.FETCH_HOTEL_INFO_SUCCESS:
      return {
        ...state,
        list: addInfo(state.list, payload),
        specificHotelStatus: constants.SUCCESS
      };
    case constants.FETCH_HOTEL_INFO_ERROR:
      return { ...state, specificHotelStatus: constants.ERROR };
    default:
      return state;
  }
};

const addInfo = (arr, data) => {
  // load additional info for a particular room
  const { _id } = data;
  if (arr.length === 0) {
    return [data];
  }
  let res = arr.map(element => {
    if (_id === element._id) {
      return data;
    }
    return element;
  });
  return res;
};

const removeDuplicates = arr => {
  return arr.filter((elem, index) => {
    const id = arr.findIndex(x => x._id === elem._id);
    return index === id;
  });
};
