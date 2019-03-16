import { connect } from "inferno-redux";

import { StakingDashboard } from "./staking-dashboard";
import { fetchDelegateData } from "./staking-dashboard-actions";
import { fetchIotxplorerDelegateData } from "./staking-dashboard-actions";
// import * as actions from './staking-actions';

export const StakingDashboardContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.stakingDashboard || null,
      delegateData: state.stakingDashboard.delegateData,
      iotxplorerDelegateData: state.stakingDashboard.iotxplorerDelegateData
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchIotxplorerDelegateData: () => dispatch(fetchIotxplorerDelegateData())
  })
)(StakingDashboard);
