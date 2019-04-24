export default function reducer(state = {
  chartData: null,
  fetching: false,
  error: null,
}, action) {
  switch (action.type) {
  case 'FETCH_CHART_DATA': {
    return {...state, fetching: true};
  }
  case 'FETCH_CHART_DATA_FAIL': {
    return {...state, fetching: false, error: action.payload.error};
  }
  case 'FETCH_CHART_DATA_SUCCESS': {
    return {
      ...state,
      fetching: false,
      chartData: action.payload.chartData,
    };
  }
  default: {
    return state;
  }
  }
}
