import { connect } from "react-redux";

import { VotingAndDelegating } from "./voting-and-delegating";
// import * as actions from './education-actions';

export const VotingAndDelegatingContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.votingAndDelegating || null
    };
  },
  dispatch => ({})
)(VotingAndDelegating);
