import constants from '../utils/constants';

const initialState = {
  status: constants.INITIAL,
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
        list: [...state.list, ...payload.docs],
        page: parseInt(payload.page) + 1,
        pages: payload.pages,
        total: payload.total,
        status: constants.SUCCESS
      };
    default:
      return state;
  }
};

const addInfo = (arr, data) => {
  // load additional info for a particular room
  const { id } = data;
  let res = arr.map(element => {
    if (parseInt(element.id, 10) === parseInt(id, 10)) {
      return {
        ...data,
        ...element
      };
    }
    return element;
  });
  return res;
};
