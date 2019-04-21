import { connect } from "inferno-redux";

import { fetchBlockMetasByIndex } from "../consensus-metrics/consensus-metrics-actions";
import { SearchBar } from "./search-bar";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";

export const SearchBarContainer = connect(
  function mapStateToProps(state) {
    return {
      consensus: state.consensus,
      delegateData: state.stakingDashboard.delegateData
    };
  },
  dispatch => ({
    fetchBlockMetasByIndex: data => dispatch(fetchBlockMetasByIndex(data)),
    fetchDelegateData: () => dispatch(fetchDelegateData())
  })
)(SearchBar);
