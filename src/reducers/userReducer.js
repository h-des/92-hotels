const initialState = { data: null, status: 'NORMAL' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'FETCH_USER_SUCCESS':
      return { data: { ...payload }, status: 'SUCCESS' };
    case 'FETCH_USER_FAILURE':
      return { ...state, status: 'ERROR' };
    case 'LOG_OUT':
      return { data: null, status: 'NORMAL' };
    default:
      return state;
  }
};
