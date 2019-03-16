export default function reducer(
  state = {
    delegateData: null,
    fetching: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_DELEGATE_DATA": {
      return { ...state, fetching: true };
    }
    case "FETCH_DELEGATE_DATA_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_DELEGATE_DATA_SUCCESS": {
      return {
        ...state,
        fetching: false,
        delegateData: action.payload.delegateData
      };
    }
    default: {
      return state;
    }
  }
}
