import { CONSENSUS_API, DASHBOARD, ACTION } from "../common/site-url";
import { jsonCall } from "../common/actions";

export function fetchConsensusMetrics(data) {
  return jsonCall(data, "FETCH_CONSENSUS_METRICS", CONSENSUS_API);
}

export function fetchElectionStats() {
  return jsonCall([], "FETCH_ELECTION_STATS", DASHBOARD.ELECTION_STATS);
}

export function fetchbpCandidatesOnContract() {
  return jsonCall([], "FETCH_CANDIDATE_DATA", DASHBOARD.CANDIDATE_DATA);
}

export function fetchBlockMetasByIndex(data) {
  return jsonCall(data, "FETCH_BLOCK_METAS", DASHBOARD.BLOCK_METAS);
}

export function fetchActionsByIndex(data) {
  return jsonCall(data, "FETCH_ACTIONS_INDEX", ACTION.GET_ACTIONS);
}
