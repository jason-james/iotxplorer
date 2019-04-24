/* eslint-disable no-console,no-undef */
import {jsonCall} from '../common/actions';
import {STAKING_DASHBOARD} from '../common/site-url';

export function fetchDelegateData() {
  return jsonCall([], 'FETCH_DELEGATE_DATA', STAKING_DASHBOARD.DELEGATE_DATA);
}

export function fetchIotxplorerDelegateData() {
  return jsonCall(
    [],
    'FETCH_IOTXPLORER_DELEGATE_DATA',
    STAKING_DASHBOARD.IOTXPLORER_DELEGATE_DATA
  );
}
