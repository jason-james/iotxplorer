/* eslint-disable no-console,no-undef */
import {jsonCall} from '../common/actions';
import {CHART} from '../common/site-url';

export function fetchChartData() {
  return jsonCall([], 'FETCH_CHART_DATA', CHART.CHART_DATA);
}
