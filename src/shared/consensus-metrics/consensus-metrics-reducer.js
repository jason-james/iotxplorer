export default function reducer(
  state = {
    fetching: true,
    error: null,
    metrics: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_CONSENSUS_METRICS": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_CONSENSUS_METRICS_FAIL": {
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      };
    }
    case "FETCH_CONSENSUS_METRICS_SUCCESS": {
      return {
        ...state,
        fetching: false,
        metrics: action.payload.consensusMetrics
      };
    }
    case "FETCH_ELECTION_STATS": {
      return { ...state, fetching: true };
    }
    case "FETCH_ELECTION_STATS_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_ELECTION_STATS_SUCCESS": {
      return {
        ...state,
        fetching: false,
        electionStats: action.payload.electionStats
      };
    }
    case "FETCH_CANDIDATE_DATA": {
      return { ...state, fetching: true };
    }
    case "FETCH_CANDIDATE_DATA_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_CANDIDATE_DATA_SUCCESS": {
      return {
        ...state,
        fetching: false,
        bpCandidatesOnContract: action.payload.bpCandidatesOnContract
      };
    }
    case "FETCH_BLOCK_METAS": {
      return { ...state, fetching: true };
    }
    case "FETCH_BLOCK_METAS_FAIL": {
      return { ...state, fetching: false, error: action.payload.error };
    }
    case "FETCH_BLOCK_METAS_SUCCESS": {
      return {
        ...state,
        fetching: false,
        blockMetas: action.payload.blockMetas,
        start: action.payload.start,
        count: action.payload.count
      };
    }
    default: {
      return state;
    }
  }
}
