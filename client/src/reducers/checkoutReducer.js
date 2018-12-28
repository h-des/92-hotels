const initialState = {
  data: null,
  checkoutStatus: 'WAITING',
  paymentStatus: 'WAITING'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AVAILABLE':
      return { ...state, data: payload, checkoutStatus: 'AVAILABLE' };
    case 'RESET':
      return {
        data: null,
        checkoutStatus: 'WAITING',
        paymentStatus: 'WAITING'
      };
    case 'PROCEED_TO_PAYMENT':
      return {
        data: { ...state.data, ...payload },
        checkoutStatus: 'CARD_DETAILS',
        paymentStatus: 'READY'
      };
    case 'PAY':
      return { ...state, paymentStatus: 'PAYMENT_IN_PROGRESS' };
    case 'ERROR':
      return { ...state, paymentStatus: 'PAYMENT_ERROR' };
    case 'SUCCESS':
      return { ...state, paymentStatus: 'PAYMENT_SUCCESS' };
    default:
      return state;
  }
};
