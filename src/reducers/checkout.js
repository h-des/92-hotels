const initialState = {
  data: null,
  status: 'WAITING'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AVAILABLE':
      return { data: payload, status: 'AVAILABLE' };
    case 'RESET':
      return { data: null, status: 'WAITING' };
    default:
      return state;
  }
};
