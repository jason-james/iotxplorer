import { createViewRoutes } from "../../view-routes";
import { rootReducer } from "../../common/root/root-reducer";
import { EDUCATION } from "../../common/site-url";

export function setVotingAndDelegatingRoutes(server) {
  function votingAndDelegatingHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  server.get(
    "votinganddelegating",
    EDUCATION.VOTING_AND_DELEGATING,
    votingAndDelegatingHandler
  );
}
