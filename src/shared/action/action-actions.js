import { ACTION } from "../common/site-url";
import { jsonCall } from "../common/actions";

export function fetchAction(data) {
  return jsonCall(data, "FETCH_ACTION", ACTION.GET);
}

export function fetchActionReceipt(data) {
  return jsonCall(data, "FETCH_ACTION_RECEIPT", ACTION.GET_RECEIPT);
}
