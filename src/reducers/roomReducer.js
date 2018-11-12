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
      return { list: [...payload], status: 'SUCCESS' };
    case 'LOAD_MORE_ROOMS_REQUEST':
      return { ...state, status: 'LOADING' };
    case 'LOAD_MORE_ROOMS_FAILURE':
      return { ...state, status: 'FAILURE' };
    case 'LOAD_MORE_ROOMS_SUCCESS':
      return { list: [...state.list, ...payload], status: 'SUCCESS' };
    default:
      return state;
  }
};
