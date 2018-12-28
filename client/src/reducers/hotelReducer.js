import constants from '../utils/constants';

const initialState = {
  status: constants.INITIAL,
  list: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
