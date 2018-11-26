const initialState = { data: null, status: 'NORMAL' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'FETCH_USER_SUCCESS':
      return { data: { ...getFormattedData(payload) }, status: 'SUCCESS' };
    case 'FETCH_USER_FAILURE':
      return { ...state, status: 'ERROR' };
    case 'LOG_OUT':
      return { data: null, status: 'NORMAL' };
    default:
      return state;
  }
};

const getFirstName = fullName => fullName.split(' ')[0];
const getLastName = fullName => fullName.split(' ')[1];
const getFormattedPhoneNumber = num => num.split(' ')[0];

//manipulate data from fake api
const getFormattedData = user => {
  const { name, phone, address } = user;
  return {
    ...user,
    firstName: getFirstName(name),
    lastName: getLastName(name),
    phone: getFormattedPhoneNumber(phone),
    address: `${address.street} ${address.suite}`,
    zipcode: address.zipcode,
    city: address.city
  };
};
