import { DASHBOARD } from "../common/site-url";

export function setMarketDashboardRoutes(server) {
  const {
    gateways: { coinmarketcap }
  } = server;

  async function getMarketData(ctx, next) {
    try {
      const response = await coinmarketcap.fetchMarketData();
      const d = response.data.data.IOTX;
      const marketData = {
        marketCap: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 1
        }).format(d.quote.USD.market_cap),
        supply: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(d.circulating_supply),
        volume: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(d.quote.USD.volume_24h)
      };

      ctx.body = { ok: true, marketData };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_MARKET_DATA", message: error }
      };
    }
  }

  server.post("getMarketData", DASHBOARD.MARKET_DATA, getMarketData);
}
