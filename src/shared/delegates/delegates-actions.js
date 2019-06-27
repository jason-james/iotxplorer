import { DELEGATES } from "../common/site-url";
import { jsonCall } from "../common/actions";

export function fetchDelegates(data) {
  return jsonCall(data, "FETCH_DELEGATES", DELEGATES.GET);
}

export function fetchProductivity(data) {
  return jsonCall(data, "FETCH_PRODUCTIVITIES", DELEGATES.GET_PRODUCTIVITY);
}

export function fetchBuckets(data) {
  return jsonCall(data, "FETCH_BUCKETS", DELEGATES.GET_BUCKETS);
}
