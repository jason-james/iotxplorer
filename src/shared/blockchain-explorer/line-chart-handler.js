import { CHART } from "../common/site-url";

export function setLineChartRoutes(server) {
  const {
    gateways: { cryptocompare }
  } = server;

  async function getChartData(ctx, next) {
    try {
      const response = await cryptocompare.fetchChartData();
      const chartData = response.data.Data;
      console.log(chartData);
      ctx.body = { ok: true, chartData };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_CHART_DATA", message: "error.unknown" }
      };
    }
  }

  server.post("getChartData", CHART.CHART_DATA, getChartData);
}
