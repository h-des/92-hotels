const initialState = {
  status: 'NORMAL',
  list: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_ROOMS_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'FETCH_ROOMS_FAILURE':
      return { ...state, status: 'FAILURE' };
    case 'FETCH_ROOMS_SUCCESS':
      return { list: [...addProperties(payload)], status: 'SUCCESS' };
    case 'FETCH_MORE_ROOMS_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'FETCH_MORE_ROOMS_FAILURE':
      return { ...state, status: 'FAILURE' };
    case 'FETCH_MORE_ROOMS_SUCCESS':
      return {
        list: [...state.list, ...addProperties(payload)],
        status: 'SUCCESS'
      };
    case 'FETCH_ROOM_INFO_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'FETCH_ROOM_INFO_FAILURE':
      return { ...state, status: 'FAILURE' };
    case 'FETCH_ROOM_INFO_HALF':
      return {
        list: [...addElement(state.list, payload)],
        ...state
      };
    case 'FETCH_ROOM_INFO_SUCCESS':
      return {
        list: [...addInfo(state.list, payload)],
        status: 'SUCCESS'
      };
    default:
      return state;
  }
};

const addElement = (arr, element) => {
  const { id } = element;
  const myElement = arr.filter(e => e.id == id)[0];
  const newElement = addProperties([element])[0];
  if (myElement) {
    return addInfo(arr, newElement);
  } else {
    let res = arr.push(newElement);
    return res;
  }
};

const addProperties = arr =>
  arr.map(e => {
    const price = (Math.floor(Math.random() * 8) + 1) * 50;
    const beds = Math.floor(Math.random() * 4) + 1;
    const guests = beds * 2 - 1;
    return { ...e, beds, guests, price };
  });

const addInfo = (arr, data) => {
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
