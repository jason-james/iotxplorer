import { connect } from "react-redux";

import { UnderstandingIoTeX } from "./understanding-iotex";
// import * as actions from './education-actions';

export const UnderstandingIoTeXContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.UnderstandingIoTeX || null
    };
  },
  dispatch => ({})
)(UnderstandingIoTeX);
