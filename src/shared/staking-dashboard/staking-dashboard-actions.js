/* eslint-disable no-console,no-undef */
import { jsonCall } from "../common/actions";
import { STAKING_DASHBOARD } from "../common/site-url";

export function fetchDelegateData() {
  return jsonCall([], "FETCH_DELEGATE_DATA", STAKING_DASHBOARD.DELEGATE_DATA);
}
