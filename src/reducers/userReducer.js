const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return { ...state, ...payload };

    default:
      return state;
  }
};
