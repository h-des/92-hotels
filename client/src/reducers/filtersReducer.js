import constants from '../utils/constants';

export default (state = null, { type, payload }) => {
  switch (type) {
    case constants.ADD_FILTERS:
      return { ...payload };
    case constants.REMOVE_FILTERS:
      return null;
    default:
      return state;
  }
};
