import constants from '../utils/constants';

const initialState = {
  data: null,
  availability: constants.INITIAL,
  checkoutStatus: constants.INITIAL
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.RESET_AVAILABILITY:
      return { ...state, availability: constants.INITIAL };
    case constants.CHECK_AVAILABILITY:
      return { ...state, availability: constants.LOADING };
    case constants.CHECK_AVAILABILITY_SUCCESS:
      return { ...state, availability: constants.SUCCESS };
    case constants.CHECK_AVAILABILITY_ERROR:
      return { ...state, availability: constants.ERROR };
    default:
      return state;
  }
};
