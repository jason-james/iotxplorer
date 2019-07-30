// @flow

import config from "config";
import axios from "axios";
import crypto from "crypto";
import type { Server } from "../lib/server";
import initWebhook from "../tip-bot/webhook";
import { setBlockchainExplorerRoutes } from "../shared/blockchain-explorer/blockchain-explorer-handler";

import { setAddressRoutes } from "../shared/address/address-handler";
import { setBlockRoutes } from "../shared/block/block-handler";
import { setBlocksRoutes } from "../shared/blocks/blocks-handler";
import { setNavRoutes } from "../shared/common/nav/nav-handler";
import { setConsensusMetricsRoutes } from "../shared/consensus-metrics/consensus-metrics-handler";
import { setDelegateRoutes } from "../shared/delegates/delegates-handler";
import { version } from "../../package.json";
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
import { getDB } from "../database/db";
import { setActionRoutes } from "../shared/action/action-handler";
import { setJsonRpcRoutes } from "./json-rpc/json-rpc";
import { handleWebhook } from "../tip-bot/webhook";
import Twit from "twit";

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

  // var Twitter = new Twit({
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token: process.env.TWITTER_ACCESS_TOKEN,
  //   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  // });

  // Twitter.get("account_activity/all/webhooks", (err, body, res) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(body.environments[0].webhooks);
  // });

  // initWebhook(
  //   process.env.TWITTER_ACCESS_TOKEN,
  //   process.env.TWITTER_ACCESS_TOKEN_SECRET,
  //   server
  // );

  /**
   * Creates a HMAC SHA-256 hash created from the app TOKEN and
   * your app Consumer Secret.
   * @param  token  the token provided by the incoming GET request
   * @return string
   */

  server.get(
    "get-challenge-response",
    "/webhooks/twitter",
    async (ctx, next) => {
      const response_token = crypto
        .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
        .update(ctx.query.crc_token)
        .digest("base64");
      ctx.response.body = { response_token: "sha256=" + response_token };
      ctx.response.status = 200;
      console.log(ctx.response);
    }
  );

  server.post("log-event", "/webhooks/twitter", async (ctx, next) => {
    console.log("EVENT PAYLOAD", ctx.request.body);
  });

  // server.post("webhook-event", "/webhooks/twitter", handleWebhook);

  // server.get("addsub-callback", "/callbacks/addsub", (ctx, next) => {
  //   ctx.response.body = { ok: true };
  // });

  // server.get("addsub-callback", "/callbacks/removesub", (ctx, next) => {
  //   ctx.response.body = { ok: true };
  // });

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

  setJsonRpcRoutes(server);
  setNavRoutes(server);
  setConsensusMetricsRoutes(server);
  setBlockchainExplorerRoutes(server);
  setMarketDashboardRoutes(server);
  setLineChartRoutes(server);

  setAddressRoutes(server);

  setBlockRoutes(server);
  setBlocksRoutes(server);

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
