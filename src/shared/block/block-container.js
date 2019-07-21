import { connect } from "react-redux";

import * as actions from "../block/block-actions";
import { fetchBlockMeta } from "../block/block-actions";
import { Block } from "./block";
import { fetchbpCandidatesOnContract } from "../consensus-metrics/consensus-metrics-actions";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";

export const BlockContainer = connect(
  function mapStateToProps(state) {
    return {
      width: state.app.width,
      chainId: state.base.chainId,
      block: state.block,
      consensus: state.consensus,
      delegateData: state.stakingDashboard.delegateData
    };
  },
  dispatch => ({
    fetchBlockId: data => dispatch(actions.fetchBlockId(data)),
    fetchBlockExecutionsId: data =>
      dispatch(actions.fetchBlockExecutionsId(data)),
    fetchBlockTransfersId: data =>
      dispatch(actions.fetchBlockTransfersId(data)),
    fetchBlockVotesId: data => dispatch(actions.fetchBlockVotesId(data)),
    fetchBlockMeta: data => dispatch(fetchBlockMeta(data)),
    fetchbpCandidatesOnContract: () => dispatch(fetchbpCandidatesOnContract()),
    fetchDelegateData: () => dispatch(fetchDelegateData())
  })
)(Block);
