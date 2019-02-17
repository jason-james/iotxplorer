import {createViewRoutes} from '../view-routes';
import {rootReducer} from '../common/root/root-reducer';
import {STAKING} from '../common/site-url';

export function setStakingRoutes(server) {

  function stakingHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  server.get('staking', STAKING.INDEX, stakingHandler);
}
