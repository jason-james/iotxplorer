import { createViewRoutes } from "../../view-routes";
import { rootReducer } from "../../common/root/root-reducer";
import { EDUCATION } from "../../common/site-url";

export function setUsingTheTestnetRoutes(server) {
  function usingTheTestnetHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  server.get(
    "usingthetestnet",
    EDUCATION.USING_THE_TESTNET,
    usingTheTestnetHandler
  );
}
