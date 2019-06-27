import { connect } from "react-redux";

import { Delegates } from "./delegates";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";
import { fetchConsensusMetrics } from "../consensus-metrics/consensus-metrics-actions";
import { fetchProductivity, fetchBuckets } from "./delegates-actions";

export const DelegatesContainer = connect(
  function mapStateToProps(state) {
    return {
      delegates: state.stakingDashboard,
      width: state.app.width,
      consensus: state.consensus,
      productivity: state.delegates.productivities,
      bucketInfo: state.delegates.bucketInfoList,
      rewards: state.delegates.rewards
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchConsensusMetrics: () => dispatch(fetchConsensusMetrics()),
    fetchProductivity: data => dispatch(fetchProductivity(data)),
    fetchBuckets: data => dispatch(fetchBuckets(data))
  })
)(Delegates);
