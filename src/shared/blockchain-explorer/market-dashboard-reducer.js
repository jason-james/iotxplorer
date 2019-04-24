export default function reducer(state = {
  marketData: null,
  fetching: false,
  error: null,
}, action) {
  switch (action.type) {
  case 'FETCH_MARKET_DATA': {
    return {...state, fetching: true};
  }
  case 'FETCH_MARKET_DATA_FAIL': {
    return {...state, fetching: false, error: action.payload.error};
  }
  case 'FETCH_MARKET_DATA_SUCCESS': {
    return {
      ...state,
      fetching: false,
      marketData: action.payload.marketData,
    };
  }
  default: {
    return state;
  }
  }
}
