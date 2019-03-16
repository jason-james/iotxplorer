import { connect } from "inferno-redux";

import { StakingDashboard } from "./staking-dashboard";
import { fetchDelegateData } from "./staking-dashboard-actions";
// import * as actions from './staking-actions';

export const StakingDashboardContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.stakingDashboard || null,
      delegateData: state.stakingDashboard.delegateData
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData())
  })
)(StakingDashboard);
