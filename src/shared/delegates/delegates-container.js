import { connect } from "react-redux";

import { Delegates } from "./delegates";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";

export const DelegatesContainer = connect(
  function mapStateToProps(state) {
    return {
      delegates: state.stakingDashboard,
      width: state.app.width
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData())
  })
)(Delegates);
