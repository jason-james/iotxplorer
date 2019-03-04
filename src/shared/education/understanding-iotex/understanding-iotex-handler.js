import { createViewRoutes } from "../../view-routes";
import { rootReducer } from "../../common/root/root-reducer";
import { EDUCATION } from "../../common/site-url";

export function setUnderstandingIotexRoutes(server) {
  function understandingIotexHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  server.get(
    "understandingiotex",
    EDUCATION.UNDERSTANDING_IOTEX,
    understandingIotexHandler
  );
}
