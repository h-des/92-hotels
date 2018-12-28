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

const addElement = (arr, element) => {
  //insert one room into array
  const newElement = addProperties([element])[0];
  return [...arr, newElement];
};

const addProperties = arr =>
  //randomly generate additional fields
  arr.map(e => {
    const price = (Math.floor(Math.random() * 8) + 1) * 50;
    const beds = Math.floor(Math.random() * 4) + 1;
    const guests = beds * 2 - 1;
    return { ...e, beds, guests, price };
  });

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
