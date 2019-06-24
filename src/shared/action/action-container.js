import { connect } from "react-redux";

import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";
import { Action } from "./action";
import { fetchAction, fetchActionReceipt } from "./action-actions";

export const ActionContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.action || null,
      delegateData: state.stakingDashboard.delegateData,
      price: state.nav.price
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchAction: data => dispatch(fetchAction(data)),
    fetchActionReceipt: data => dispatch(fetchActionReceipt(data))
  })
)(Action);
