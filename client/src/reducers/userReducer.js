import constants from '../utils/constants'
const initialState = {
  data: null,
  status: constants.INITIAL,
  editUserStatus: constants.INITIAL,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.LOGIN:
      return { ...state, status: constants.LOADING }
    case constants.LOGIN_ERROR:
      return { ...state, error: payload, status: constants.ERROR }
    case constants.LOGIN_SUCCESS:
      return { data: payload, status: constants.SUCCESS }
    case constants.LOGOUT:
      return { data: null, status: constants.INITIAL }
    case constants.EDIT_USER:
      return { ...state, editUserStatus: constants.LOADING }
    case constants.EDIT_USER_ERROR:
      return { ...state, editUserStatus: constants.ERROR }
    case constants.EDIT_USER_SUCCESS:
      return { ...state, data: payload, editUserStatus: constants.SUCCESS }
    default:
      return state
  }
}
