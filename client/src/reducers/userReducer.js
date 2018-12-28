import constants from '../utils/constants';
const initialState = { data: null, status: constants.INITIAL, error: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.LOGIN:
      return { ...state, status: constants.LOADING };
    case constants.LOGIN_ERROR:
      return { ...state, error: payload, status: constants.ERROR };
    case constants.LOGIN_SUCCESS:
      return { data: payload, status: constants.SUCCESS };
    case constants.LOGOUT:
      return { data: null, status: constants.INITIAL };
    default:
      return state;
  }
};
