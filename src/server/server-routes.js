// @flow

import config from "config";
import axios from "axios";
import type { Server } from "../lib/server";
import { setBlockchainExplorerRoutes } from "../shared/blockchain-explorer/blockchain-explorer-handler";
import { setExecutionHandler } from "../shared/execution/execution-handler";
import { setExecutionsHandler } from "../shared/executions/executions-handler";
import { setTransferHandler } from "../shared/transfer/transfer-handler";
import { setTransfersHandler } from "../shared/transfers/transfers-handler";
import { setAddressRoutes } from "../shared/address/address-handler";
import { setBlockRoutes } from "../shared/block/block-handler";
import { setBlocksRoutes } from "../shared/blocks/blocks-handler";
import { setNavRoutes } from "../shared/common/nav/nav-handler";
import { setVoteRoutes } from "../shared/vote/vote-handler";
import { setVotesRoutes } from "../shared/votes/votes-handler";
import { setConsensusMetricsRoutes } from "../shared/consensus-metrics/consensus-metrics-handler";
import { setContractRoutes } from "../shared/wallet/contract/contract-handler";
import { setWalletRoutes } from "../shared/wallet/wallet-handler";
import { setDelegateRoutes } from "../shared/delegates/delegates-handler";
import { setDepositRoutes } from "../shared/deposit/deposit-handler";
import { version } from "../../package.json";
import { setJsonRpcRoutes } from "./json-rpc/json-rpc";
import { setMarketDashboardRoutes } from "../shared/blockchain-explorer/market-dashboard-handler";
import { setStakingRoutes } from "../shared/staking/staking-handler";
import { setLineChartRoutes } from "../shared/blockchain-explorer/line-chart-handler";
import { setStakingDashboardRoutes } from "../shared/staking-dashboard/staking-dashboard-handler";
import { setHowToStakeRoutes } from "../shared/staking-dashboard/staking-voting/how-to-stake-handler";
import { setEducationRoutes } from "../shared/education/education-handler";
import { setUnderstandingIotexRoutes } from "../shared/education/understanding-iotex/understanding-iotex-handler";
import { setUsingTheTestnetRoutes } from "../shared/education/using-the-testnet/using-the-testnet-handler";
import { setVotingAndDelegatingRoutes } from "../shared/education/voting-and-delegating/voting-and-delegating-handler";
import { setCalculatorsRoutes } from "../shared/staking-dashboard/calculators/staking-calcs-handler";
import { fetchVotersId } from "../shared/vote/vote-actions";
import { getDB } from "../database/db";
import { setActionRoutes } from "../shared/action/action-handler";

// eslint-disable-next-line max-statements
export function setServerRoutes(server: Server) {
  // Health checks
  server.get("health", "/health", function onHealth(ctx) {
    ctx.body = "OK";
  });

  // Optional route for testing error handling
  server.get("trigger-error", "/trigger-error", function triggerError(ctx) {
    server.logger.error("Testing an error");
  });

  server.use(async function globalConfig(ctx, next) {
    const chains = config.chains;
    const href = ctx.href;
    ctx.setState("base.chains", chains);
    ctx.setState("base.href", href);
    ctx.setState("base.version", version);
    const curChain = chains.find(c => {
      return href.indexOf(c.url) === 0;
    });
    const chainId = curChain ? curChain.id : 1;
    ctx.setState("base.chainId", chainId);
    await next();
  });

  // Fetching from MongoDB
  server.get("get-voter", "/api/getVoter/:address", async (ctx, next) => {
    // Fetch all rewards from the database and return as payload
    const rewardHistory = await getDB()
      .db()
      .collection("Voters")
      .find({
        $or: [
          { voter: ctx.params.address },
          { voterIoAddr: ctx.params.address }
        ]
      })
      .skip((ctx.query.page - 1) * 8)
      .sort({ timestamp: -1 })
      .toArray();
    ctx.response.body = { ok: true, rewardHistory };
  });

  // // Fetching from MongoDB
  // server.get("get-voter", "/api/getVoter/:address", async (ctx, next) => {
  //   // Fetch all rewards from the database and return as payload
  //   const rewardHistory = await getDB()
  //     .db()
  //     .collection("Voters")
  //     .aggregate([
  //       {
  //         $facet: {
  //           pageInfo: [
  //             {
  //               $match: {
  //                 $or: [
  //                   { voter: ctx.params.address },
  //                   { voterIoAddr: ctx.params.address }
  //                 ]
  //               }
  //             },
  //             {
  //               $skip: (ctx.query.page - 1) * 8
  //             },
  //             {
  //               $sort: { timestamp: -1 }
  //             }
  //           ],
  //           completeData: [
  //             {
  //               $match: {
  //                 $or: [
  //                   { voter: ctx.params.address },
  //                   { voterIoAddr: ctx.params.address }
  //                 ]
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     ])
  //     .toArray(function(err, results) {
  //       if (err) {
  //         console.log(err);
  //       }
  //       return results;
  //     });
  //   ctx.response.body = { ok: true, rewardHistory };
  // });

  setJsonRpcRoutes(server);
  setNavRoutes(server);
  setConsensusMetricsRoutes(server);
  setBlockchainExplorerRoutes(server);
  setMarketDashboardRoutes(server);
  setLineChartRoutes(server);

  setExecutionHandler(server);
  setExecutionsHandler(server);

  setTransferHandler(server);
  setTransfersHandler(server);

  setAddressRoutes(server);

  setVoteRoutes(server);
  setVotesRoutes(server);

  setBlockRoutes(server);
  setBlocksRoutes(server);

  setDepositRoutes(server);

  setWalletRoutes(server);
  setContractRoutes(server);

  setDelegateRoutes(server);

  setStakingRoutes(server);

  setStakingDashboardRoutes(server);

  setHowToStakeRoutes(server);

  setEducationRoutes(server);

  setUnderstandingIotexRoutes(server);

  setUsingTheTestnetRoutes(server);

  setVotingAndDelegatingRoutes(server);

  setCalculatorsRoutes(server);

  setActionRoutes(server);
}
