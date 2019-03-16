import { DASHBOARD } from "../common/site-url";

export function setMarketDashboardRoutes(server) {
  const {
    gateways: { coinmarketcap }
  } = server;

  async function getMarketData(ctx, next) {
    try {
      const response = await coinmarketcap.fetchMarketData();
      const d = response.data[0];
      const marketData = {
        marketCap: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 1
        }).format(d.market_cap_usd),
        supply: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(d.available_supply),
        volume: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(d["24h_volume_usd"])
      };

      ctx.body = { ok: true, marketData };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_MARKET_DATA", message: "error.unknown" }
      };
    }
  }

  server.post("getMarketData", DASHBOARD.MARKET_DATA, getMarketData);
}
