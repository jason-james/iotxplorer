import config from "config";
import RpcMethod from "iotex-antenna/lib/rpc-method/node-rpc-method";
import Antenna from "iotex-antenna";
import { CoinMarketCap } from "./coin-market-cap";
import { CrossChain } from "./cross-chains";
import { CryptoCompare } from "./crypto-compare";
import { IotexGraphQL } from "./iotex-graph-ql";

export function setGateways(server) {
  server.gateways = server.gateways || {};
  server.gateways.coinmarketcap = new CoinMarketCap();
  server.gateways.cryptocompare = new CryptoCompare();
  server.gateways.iotexgraphql = new IotexGraphQL();
  server.gateways.RpcMethod = new RpcMethod(
    server.config.gateways.iotexAntenna
  );
  server.gateways.crossChain = new CrossChain(config.get("chains"));

  server.gateways.iotexCore = server.gateways.iotxRpcMethods;
}
