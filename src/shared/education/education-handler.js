import {createViewRoutes} from '../view-routes';
import {rootReducer} from '../common/root/root-reducer';
import {EDUCATION} from '../common/site-url';

export function setEducationRoutes(server) {

  function educationHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  server.get('education', EDUCATION.INDEX, educationHandler);
}
