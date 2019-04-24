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

  const {
    gateways: {iotexgraphql},
  } = server;

  async function getDelegateData(ctx, next) {
    try {
      const response = await iotexgraphql.fetchDelegateData();
      const delegateData = response.data.data.bpCandidates;
      ctx.body = {ok: true, delegateData};
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {code: 'FAIL_GET_DELEGATE_DATA', message: 'error.unknown'},
      };
    }
  }

  async function getIotxplorerDelegateData(ctx, next) {
    try {
      const response = await iotexgraphql.fetchIotxplorerData();
      const iotxplorerDelegateData = parseInt(
        response.data.data.bpCandidate.rank
      );
      ctx.body = {ok: true, iotxplorerDelegateData};
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: 'FAIL_GET_IOTXPLORER_DELEGATE_DATA',
          message: 'error.unknown',
        },
      };
    }
  }

  // DEFINE AN ASYNC FUNCTION WHICH IS A GET REQUEST TO THE DATABASE CALLED FETCH VOTERS WHICH IS CALLED BY OUR DASHBOARD WHEN A USER ENTERS A SEARCH QUERY
  // DEFINE GET METHOD WITH NAME, LINK (/API/STAKINGDASH/VOTERS) AND THE HANDLER FUNCTION (IE GETS QUERY FROM DB)
  // PASS HANDLER FUNCTION VIA REDUX TO STAKING DASH SO YOU CAN CALL IT THERE ON FORM SUBMIT
  // REMEMBER TO SET MONGO COMPASS URI IN ENVIRONMENT VARIABLES SO NOT EXPOSED TO FRONT END

  server.get(
    'stakingDashboard',
    STAKING_DASHBOARD.INDEX,
    stakingDashboardHandler
  );
  server.post(
    'getDelegateData',
    STAKING_DASHBOARD.DELEGATE_DATA,
    getDelegateData
  );
  server.post(
    'getIotxplorerDelegateData',
    STAKING_DASHBOARD.IOTXPLORER_DELEGATE_DATA,
    getIotxplorerDelegateData
  );
}
