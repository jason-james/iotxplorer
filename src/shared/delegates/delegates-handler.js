import { createViewRoutes } from "../view-routes";
import { rootReducer } from "../common/root/root-reducer";
import { DELEGATES } from "../common/site-url";

export function setDelegateRoutes(server) {
  const {
    gateways: { iotexCore, iotexgraphql }
  } = server;

  function delegateHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  async function getProductivity(ctx, next) {
    try {
      let arr = [];
      let rewardsArr = [];
      for (let i = 1; i < 8; i++) {
        const response = await iotexgraphql.fetchProductivity(
          ctx.request.body.name,
          ctx.request.body.startEpoch - i * 24
        );
        let { productivity } = response.data.data.delegate;
        let { reward } = response.data.data.delegate;

        if (productivity.expectedProduction !== "") {
          let prod = productivity.production / productivity.expectedProduction;
          arr.push(prod);
        }
        rewardsArr.push(reward);
      }
      ctx.body = { ok: true, productivities: arr, rewards: rewardsArr };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_PRODUCTIVITIES",
          message: error
        }
      };
    }
  }

  async function getBuckets(ctx, next) {
    try {
      const response = await iotexgraphql.fetchBuckets(ctx.request.body.name);
      let { buckets } = response.data.data;

      ctx.body = { ok: true, bucketInfoList: buckets };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_BUCKETS",
          message: error
        }
      };
    }
  }

  async function getDelegates(ctx, next) {
    try {
      ctx.body = {
        ok: true,
        delegates: await iotexCore.getCandidateMetrics()
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_DELEGATES", message: "delegates.error.fail" }
      };
    }
  }

  server.get("delegate", DELEGATES.INDEX, delegateHandler);
  server.post("getDelegates", DELEGATES.GET, getDelegates);
  server.post("getProductivity", DELEGATES.GET_PRODUCTIVITY, getProductivity);
  server.post("getBuckets", DELEGATES.GET_BUCKETS, getBuckets);
}
