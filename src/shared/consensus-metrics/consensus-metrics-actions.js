import { CONSENSUS_API, DASHBOARD } from "../common/site-url";
import { jsonCall } from "../common/actions";

export function fetchConsensusMetrics(data) {
  return jsonCall(data, "FETCH_CONSENSUS_METRICS", CONSENSUS_API);
}

export function fetchElectionStats() {
  return jsonCall([], "FETCH_ELECTION_STATS", DASHBOARD.ELECTION_STATS);
}
