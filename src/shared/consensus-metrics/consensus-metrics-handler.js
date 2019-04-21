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

  async function getbpCandidatesOnContract(ctx, next) {
    try {
      const response = await iotexgraphql.fetchbpCandidatesOnContract();
      const bpCandidatesOnContract = response.data.data.bpCandidatesOnContract;
      ctx.body = { ok: true, bpCandidatesOnContract };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_DELEGATE_DATA", message: "error.unknown" }
      };
    }
  }

  async function getBlockMetasByIndex(ctx, next) {
    try {
      const response = await RpcMethod.getBlockMetas({
        byIndex: {
          start: ctx.request.body.start,
          count: ctx.request.body.count
        }
      });
      const blockMetas = response.blkMetas;
      ctx.body = {
        ok: true,
        blockMetas,
        start: ctx.request.body.start,
        count: ctx.request.body.count
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_BLKMETA", message: "blkmeta.error.fail" }
      };
    }
  }

  async function getBlockMeta(ctx, next) {
    try {
      const response = await RpcMethod.getBlockMetas({
        byHash: { blkHash: ctx.request.body.blkHash }
      });
      const blockMeta = response.blkMetas;
      ctx.body = {
        ok: true,
        blockMeta,
        blkHash: ctx.request.body.blkHash
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_BLKMETA", message: "blkmeta.error.fail" }
      };
    }
  }

  server.post(
    "getbpCandidatesOnContract",
    DASHBOARD.CANDIDATE_DATA,
    getbpCandidatesOnContract
  );
  server.post("getBlockMetas", DASHBOARD.BLOCK_METAS, getBlockMetasByIndex);
  server.post("getBlockMetasHash", DASHBOARD.BLOCK_META, getBlockMeta);
  server.post("getConsensusMetrics", CONSENSUS_API, getConsensusMetrics);
  server.post("getElectionStats", DASHBOARD.ELECTION_STATS, getElectionStats);
}
