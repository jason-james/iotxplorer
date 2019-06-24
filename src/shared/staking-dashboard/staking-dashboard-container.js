import { connect } from "react-redux";

import { StakingDashboard } from "./staking-dashboard";
import { fetchDelegateData } from "./staking-dashboard-actions";
import { fetchIotxplorerDelegateData } from "./staking-dashboard-actions";
import { fetchElectionStats } from "../consensus-metrics/consensus-metrics-actions";
// import * as actions from './staking-actions';

export const StakingDashboardContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.stakingDashboard || null,
      delegateData: state.stakingDashboard.delegateData,
      iotxplorerDelegateData: state.stakingDashboard.iotxplorerDelegateData,
      electionStats: state.consensus.electionStats
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchIotxplorerDelegateData: () => dispatch(fetchIotxplorerDelegateData()),
    fetchElectionStats: () => dispatch(fetchElectionStats())
  })
)(StakingDashboard);
