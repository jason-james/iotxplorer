import { connect } from "react-redux";

import { UsingTheTestnet } from "./using-the-testnet";
// import * as actions from './education-actions';

export const UsingTheTestnetContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.usingTheTestnet || null
    };
  },
  dispatch => ({})
)(UsingTheTestnet);
