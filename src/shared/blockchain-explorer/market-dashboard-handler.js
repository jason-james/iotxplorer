import {DASHBOARD} from '../common/site-url'

export function setMarketDashboardRoutes(server) {
  const {gateways: {coinmarketcap}} = server;

  async function getMarketData(ctx, next) {
    try {
      const response = await coinmarketcap.fetchMarketData();
      const d = response.data[0];
      const marketData = {marketCap: d.market_cap_usd, supply: d.available_supply, volume: d['24h_volume_usd']};
      ctx.body = {ok: true, marketData};
    } catch (error) {
      ctx.body = {ok: false, error: {code: 'FAIL_GET_MARKET_DATA', message: 'error.unknown'}};
    }
  }

  server.post('getMarketData', DASHBOARD.MARKET_DATA, getMarketData);
}
