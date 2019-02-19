import {connect} from 'inferno-redux';

import {StakingDashboard} from './staking-dashboard';
// import * as actions from './staking-actions';

export const StakingDashboardContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.stakingDashboard || null,
    };
  },
  dispatch => ({

  }),
)(StakingDashboard);
