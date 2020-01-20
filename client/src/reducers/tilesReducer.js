import constants from '../utils/constants'

const initialState = {
  status: constants.INITIAL,
  list: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_TILES:
      return { ...state, status: constants.LOADING }
    case constants.FETCH_TILES_ERROR:
      return { ...state, status: constants.ERROR }
    case constants.FETCH_TILES_SUCCESS:
      return { list: payload, status: constants.SUCCESS }
    default:
      return state
  }
}
