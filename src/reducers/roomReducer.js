const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_ROOMS':
      return { ...state };

    default:
      return state;
  }
};
