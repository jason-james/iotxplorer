/* eslint-disable no-console,no-undef */
import {jsonCall} from '../common/actions';
import {DASHBOARD} from '../common/site-url';

export function fetchMarketData() {
  return jsonCall([], 'FETCH_MARKET_DATA', DASHBOARD.MARKET_DATA);
}
