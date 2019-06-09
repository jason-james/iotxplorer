export default function reducer(
  state = {
    actionInfo: [],
    receipt: {},
    fetching: true,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_ACTION": {
      return { ...state, fetching: true };
    }
    case "FETCH_ACTION_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_ACTION_SUCCESS": {
      return {
        ...state,
        fetching: false,
        error: false,
        actionInfo: action.payload.actionInfo
      };
    }
    case "FETCH_ACTION_RECEIPT": {
      return { ...state, fetching: true };
    }
    case "FETCH_ACTION_RECEIPT_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_ACTION_RECEIPT_SUCCESS": {
      return {
        ...state,
        fetching: false,
        error: false,
        receipt: action.payload.receipt
      };
    }
    default: {
      return state;
    }
  }
}
