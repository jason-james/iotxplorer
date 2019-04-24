import {connect} from 'inferno-redux';

import {fetchDelegateData} from '../staking-dashboard/staking-dashboard-actions';
import {Action} from './action';
import {fetchAction} from './action-actions';

export const ActionContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.action || null,
      delegateData: state.stakingDashboard.delegateData,
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchAction: data => dispatch(fetchAction(data)),
  })
)(Action);
