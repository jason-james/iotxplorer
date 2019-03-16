import { createViewRoutes } from "../view-routes";
import { rootReducer } from "../common/root/root-reducer";
import { STAKING_DASHBOARD } from "../common/site-url";

export function setStakingDashboardRoutes(server) {
  function stakingDashboardHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  const {
    gateways: { iotexgraphql }
  } = server;

  async function getDelegateData(ctx, next) {
    try {
      const response = await iotexgraphql.fetchDelegateData();
      console.log(response.data.data.bpCandidates[0]);
      ctx.body = { ok: true, delegateData };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_DELEGATE_DATA", message: "error.unknown" }
      };
    }
  }

  server.get(
    "stakingDashboard",
    STAKING_DASHBOARD.INDEX,
    stakingDashboardHandler
  );
  server.post(
    "getDelegateData",
    STAKING_DASHBOARD.DELEGATE_DATA,
    getDelegateData
  );
}
