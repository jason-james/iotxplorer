import { CONSENSUS_API, DASHBOARD } from "../common/site-url";

export function setConsensusMetricsRoutes(server) {
  const {
    gateways: { RpcMethod, iotexgraphql }
  } = server;

  async function getConsensusMetrics(ctx, next) {
    try {
      const chainMeta = await RpcMethod.getChainMeta({});
      const consensusMetrics = chainMeta.chainMeta;
      ctx.body = { ok: true, consensusMetrics };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_CONSENSUS", message: "consensus.error.fail" }
      };
    }
  }

  async function getElectionStats(ctx, next) {
    try {
      const response = await iotexgraphql.fetchElectionStats();
      const electionStats = response.data.data.stats;
      ctx.body = { ok: true, electionStats };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_DELEGATE_DATA", message: "error.unknown" }
      };
    }
  }

  server.post("getConsensusMetrics", CONSENSUS_API, getConsensusMetrics);
  server.post("getElectionStats", DASHBOARD.ELECTION_STATS, getElectionStats);
}
