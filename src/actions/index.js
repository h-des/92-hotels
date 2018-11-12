import axios from 'axios';

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

export const loadMoreRooms = () => dispatch => {
  dispatch({ type: 'LOAD_MORE_ROOMS_REQUEST' });

  return axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(
      json => dispatch({ type: 'LOAD_MORE_ROOMS_SUCCESS', payload: json.data }),
      err => {
        console.log(err);
        return dispatch({ type: 'LOAD_MORE_ROOMS_FAILURE' });
      }
    );
};
