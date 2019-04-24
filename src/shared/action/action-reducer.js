export default function reducer(
  state = {
    actionInfo: [],
    fetching: true,
    error: null,
  },
  action
) {
  switch (action.type) {
  case 'FETCH_ACTION': {
    return {...state, fetching: true};
  }
  case 'FETCH_ACTION_FAIL': {
    return {...state, fetching: false, error: action.payload.error};
  }
  case 'FETCH_ACTION_SUCCESS': {
    return {
      ...state,
      fetching: false,
      error: false,
      actionInfo: action.payload.actionInfo,
    };
  }
  default: {
    return state;
  }
  }
}
