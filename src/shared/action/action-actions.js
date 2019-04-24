import {ACTION} from '../common/site-url';
import {jsonCall} from '../common/actions';

export function fetchAction(data) {
  return jsonCall(data, 'FETCH_ACTION', ACTION.GET);
}
