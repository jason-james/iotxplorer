import { connect } from "react-redux";

import { fetchBlockMetasByIndex } from "../consensus-metrics/consensus-metrics-actions";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";
import { SearchBar } from "./search-bar";

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
