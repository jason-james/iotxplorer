import {createViewRoutes} from '../../view-routes';
import {rootReducer} from '../../common/root/root-reducer';
import { HOW_TO_STAKE } from '../../common/site-url';

export function setHowToStakeRoutes(server) {

  function howToStakeHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  server.get('howToStake', HOW_TO_STAKE.INDEX, howToStakeHandler);
}
