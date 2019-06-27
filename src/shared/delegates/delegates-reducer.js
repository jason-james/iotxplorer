export default function reducer(
  state = {
    fetching: true,
    error: null,
    items: [],
    productivities: [],
    sort_count: 0,
    bucketInfoList: [],
    rewards: []
  },
  action
) {
  switch (action.type) {
    case "FETCH_DELEGATES": {
      return { ...state, fetching: true };
    }
    case "FFETCH_DELEGATES_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_DELEGATES_SUCCESS": {
      const candidates = action.payload.delegates.candidates;

      return {
        ...state,
        fetching: false,
        items: candidates.sort((a, b) =>
          sortCandidates("address", a, b, state.sort_count)
        )
      };
    }
    case "SORT_BY_ADDRESS": {
      const copy = [...state.items];
      const items = copy.sort((a, b) =>
        sortCandidates("address", a, b, state.sort_count)
      );

      return {
        ...state,
        items,
        sort_count: state.sort_count + 1
      };
    }
    case "FETCH_PRODUCTIVITIES": {
      return { ...state, fetching: true };
    }
    case "FETCH_PRODUCTIVITIES_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_PRODUCTIVITIES_SUCCESS": {
      return {
        ...state,
        fetching: false,
        productivities: action.payload.productivities,
        rewards: action.payload.rewards
      };
    }
    case "FETCH_BUCKETS": {
      return { ...state, fetching: true };
    }
    case "FETCH_BUCKETS_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_BUCKETS_SUCCESS": {
      return {
        ...state,
        fetching: false,
        bucketInfoList: action.payload.bucketInfoList
      };
    }
    default: {
      return state;
    }
  }
}

function sortCandidates(field, a, b, count) {
  if (a[field] < b[field]) {
    return count % 2 === 0 ? -1 : 1;
  }
  if (a[field] > b[field]) {
    return count % 2 === 0 ? 1 : 1;
  }
  return 0;
}
