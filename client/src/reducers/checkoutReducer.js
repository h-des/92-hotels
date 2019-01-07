import constants from '../utils/constants';

const initialState = {
  data: null,
  availability: constants.INITIAL,
  paymentStatus: constants.INITIAL,
  hash: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.RESET_AVAILABILITY:
      return { ...state, availability: constants.INITIAL };
    case constants.RESET_TRANSACTION:
      return {
        ...state,
        hash: null,
        data: null,
        paymentStatus: constants.INITIAL
      };
    case constants.RESET_CHECKOUT_DATA:
      return { ...state, availability: constants.INITIAL, data: null };
    case constants.CHECK_AVAILABILITY:
      return { ...state, availability: constants.LOADING };
    case constants.CHECK_AVAILABILITY_SUCCESS:
      return { ...state, availability: constants.SUCCESS, data: payload };
    case constants.CHECK_AVAILABILITY_ERROR:
      return { ...state, availability: constants.ERROR };
    case constants.PROCEED_TO_PAYMENT:
      return { ...state, availability: constants.LOADING };
    case constants.PROCEED_TO_PAYMENT_SUCCESS:
      return { ...state, availability: constants.INITIAL, hash: payload };
    case constants.PAYMENT:
      return { ...state, paymentStatus: constants.LOADING };
    case constants.PAYMENT_ERROR:
      return { ...state, paymentStatus: constants.ERROR };
    case constants.PAYMENT_SUCCESS:
      return { ...state, paymentStatus: constants.SUCCESS };
    default:
      return state;
  }
};
