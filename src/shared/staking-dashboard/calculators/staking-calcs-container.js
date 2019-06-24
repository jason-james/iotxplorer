import { connect } from "react-redux";
import { fetchDelegateData } from "../staking-dashboard-actions";
import { fetchIotxplorerDelegateData } from "../staking-dashboard-actions";
import { Calculators } from "../calculators/staking-calcs";
// import * as actions from './staking-actions';

export const CalculatorsContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.calculators || null,
      delegateData: state.stakingDashboard.delegateData,
      iotxplorerDelegateData: state.stakingDashboard.iotxplorerDelegateData,
      width: state.app.width
    };
  },
  dispatch => ({
    fetchDelegateData: () => dispatch(fetchDelegateData()),
    fetchIotxplorerDelegateData: () => dispatch(fetchIotxplorerDelegateData())
  })
)(Calculators);
