import axios from 'axios';

export const fetchRooms = () => async dispatch => {
  dispatch({
    action: 'FETCH_ROOMS',
    payload: []
  });
};
