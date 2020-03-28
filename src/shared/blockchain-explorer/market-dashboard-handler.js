import { DASHBOARD } from "../common/site-url";

export function setMarketDashboardRoutes(server) {
  const {
    gateways: { cryptocompare }
  } = server;

  async function getMarketData(ctx, next) {
    try {
      const response = await cryptocompare.fetchMarketStats();
      const d = response.data;
      const marketData = {
        marketCap: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 1
        }).format(5399999890 * d.RAW.IOTX.USD.PRICE),
        supply: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(5399999890),
        volume: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0
        }).format(d.RAW.IOTX.USD.TOTALVOLUME24HTO)
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
