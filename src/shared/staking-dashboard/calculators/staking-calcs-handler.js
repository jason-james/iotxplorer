import {createViewRoutes} from '../../view-routes';
import {rootReducer} from '../../common/root/root-reducer';
import {STAKING_DASHBOARD} from '../../common/site-url';

export function setCalculatorsRoutes(server) {
  function calculatorsHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  server.get('calculators', STAKING_DASHBOARD.CALCULATORS, calculatorsHandler);
}
