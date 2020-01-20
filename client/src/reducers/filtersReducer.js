import constants from '../utils/constants'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case constants.ADD_FILTERS:
      return { ...payload }
    case constants.REMOVE_FILTERS:
      return {}
    default:
      return state
  }
}
