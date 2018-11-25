const initialState = {
  tiles: [],
  filters: {
    checkIn: null,
    checkOut: null,
    city: null,
    adults: 0,
    children: 0
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_ROOM_TILES_LOADED':
      return { ...state, tiles: payload };

    default:
      return state;
  }
};
