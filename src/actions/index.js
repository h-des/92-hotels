import axios from 'axios';
import fakeJSON from '../utils/fake_json';

export const fetchRooms = () => dispatch => {
  dispatch({ type: 'FETCH_ROOMS_REQUEST' });

  return axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(
      json => dispatch({ type: 'FETCH_ROOMS_SUCCESS', payload: json.data }),
      err => {
        console.log(err);
        return dispatch({ type: 'FETCH_ROOMS_FAILURE' });
      }
    );
};

export const fetchRoomTiles = () => dispatch => {
  //fake api call
  let res = [];
  for (let i = 0; i < 10; i++) {
    res.push({
      url: `https://source.unsplash.com/600x300/?city,${i}`,
      city: 'PARIS'
    });
  }
  dispatch({ type: 'FETCH_ROOM_TILES_LOADED', payload: res });
};

export const fetchMoreRooms = () => dispatch => {
  dispatch({ type: 'FETCH_MORE_ROOMS_REQUEST' });

  return axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(
      json =>
        dispatch({ type: 'FETCH_MORE_ROOMS_SUCCESS', payload: json.data }),
      err => {
        console.log(err);
        return dispatch({ type: 'FETCH_MORE_ROOMS_FAILURE' });
      }
    );
};

export const fetchFullRoomInfo = id => dispatch => {
  dispatch({ type: 'FETCH_ROOM_INFO_REQUEST' });
  //fetch basic info
  axios
    .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(json => {
      dispatch({
        type: 'FETCH_ROOM_INFO_HALF',
        payload: json.data
      });
      //fetch comments
      return axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}/comments?_limit=10`
      );
    })
    .then(json => {
      dispatch({
        type: 'FETCH_ROOM_INFO_SUCCESS',
        payload: { ...fakeJSON, comments: json.data, id }
      });
    });
};

export const fetchUser = () => dispatch => {
  dispatch({ type: 'FETCH_USER_REQUEST' });

  return axios.get('https://jsonplaceholder.typicode.com/users/1').then(
    json => dispatch({ type: 'FETCH_USER_SUCCESS', payload: json.data }),
    err => {
      console.log(err);
      return dispatch({ type: 'FETCH_USER_FAILURE' });
    }
  );
};

export const logOut = () => dispatch => {
  dispatch({ type: 'LOG_OUT' });
};

export const checkAvailability = data => dispatch => {
  //fake api call
  //then

  dispatch({ type: 'AVAILABLE', payload: data });
};

export const resetAvailability = () => dispatch => {
  dispatch({ type: 'RESET' });
};

export const proceedToPayment = data => dispatch => {
  dispatch({ type: 'PROCEED_TO_PAYMENT', payload: data });
};

export const pay = data => dispatch => {
  dispatch({ type: 'PAY' });

  setTimeout(() => {
    dispatch({ type: 'SUCCESS' });
  }, 2000);
};
