import {createViewRoutes} from '../view-routes';
import {rootReducer} from '../common/root/root-reducer';
import {STAKING_DASHBOARD} from '../common/site-url';

export function setStakingDashboardRoutes(server) {

  function stakingDashboardHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  server.get('stakingDashboard', STAKING_DASHBOARD.INDEX, stakingDashboardHandler);
}
