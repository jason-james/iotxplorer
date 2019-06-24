import { connect } from "react-redux";
import { BlockchainExplorer } from "./blockchain-explorer";

import { fetchBlocks } from "../blocks/blocks-actions";
import {
  fetchConsensusMetrics,
  fetchElectionStats,
  fetchbpCandidatesOnContract,
  fetchBlockMetasByIndex,
  fetchActionsByIndex
} from "../consensus-metrics/consensus-metrics-actions";
import { fetchDelegateData } from "../staking-dashboard/staking-dashboard-actions";
import { fetchMarketData } from "./market-dashboard-actions";
import { fetchChartData } from "./line-chart-actions";

export const BlockchainExplorerContainer = connect(
  function mapStateToProps(state) {
    return {
      executions: state.executions,
      transfers: state.transfers,
      blocks: state.blocks,
      votes: state.votes,
      consensus: state.consensus,
      width: state.app.width,
      statistic: state.nav.statistic,
      chainId: state.base.chainId,
      marketData: state.marketDashboard.marketData,
      chartData: state.lineChart.chartData,
      delegateData: state.stakingDashboard.delegateData,
      fetching: state.fetching,
      error: state.error
    };
  },
  dispatch => ({
    fetchExecutions: data => dispatch(fetchExecutions(data)),
    fetchTransfers: data => dispatch(fetchTransfers(data)),
    fetchBlocks: data => dispatch(fetchBlocks(data)),
    fetchBlockMetasByIndex: data => dispatch(fetchBlockMetasByIndex(data)),
    fetchActionsByIndex: data => dispatch(fetchActionsByIndex(data)),
    fetchConsensusMetrics: () => dispatch(fetchConsensusMetrics()),
    fetchMarketData: () => dispatch(fetchMarketData()),
    fetchChartData: () => dispatch(fetchChartData()),
    fetchElectionStats: () => dispatch(fetchElectionStats()),
    fetchbpCandidatesOnContract: () => dispatch(fetchbpCandidatesOnContract()),
    fetchDelegateData: () => dispatch(fetchDelegateData())
  })
)(BlockchainExplorer);
